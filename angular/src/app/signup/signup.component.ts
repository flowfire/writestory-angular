import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";
import { AjaxService } from "../services/ajax.service";
import { LocalStorageService } from "../services/localStorage.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string = "";
  password: string = "";
  showPassword: boolean = false;
  countryCode: string = "+86";
  account: string = "";
  captcha: string = "";

  sendCaptchaLoading: boolean = false;
  sendCaptchaTip: string = "发送验证码";
  signupLoading: boolean = false;

  signupBy: any[] = ["phone", "请输入手机号码", "使用邮箱注册"];
  changeSignupBy(): void {
    switch (this.signupBy[0]) {
      case "phone":
        this.signupBy = ["email", "请输入邮箱", "使用手机注册"];
        break;
      case "email":
        this.signupBy = ["phone", "请输入手机号码", "使用邮箱注册"];
      default:
        break;

    }
  }

  async sendCaptcha() {
    this.sendCaptchaLoading = true;
    let captRes;
    switch (this.signupBy[0]) {
      case "phone":
        captRes = await this.ajax.sendSMS(this.countryCode + this.account);
        break;
      case "email":
        captRes = await this.ajax.sendMail(this.account);
        break;
    }
    let changeValue = (() => {
      let timer = 60;
      let func = () => {
        if (timer === 0) {
          this.sendCaptchaTip = "发送验证码";
          this.sendCaptchaLoading = false;
        } else {
          this.sendCaptchaTip = timer + "s 后重发";
          timer--;
          setTimeout(func, 1000);
        }
      }
      return func;
    })();

    this.snackBar.open(captRes.message, "确定", { duration: 2000 });
    if (captRes.success) {
      changeValue();
    } else {
      this.sendCaptchaLoading = false;
    }
  }

  async signup() {
    this.signupLoading = true;

    let password = this.password;
    let username = this.username;

    let account = this.account;
    if (this.signupBy[0] === "phone") account = this.countryCode + account;

    let captcha = this.captcha;
    let response = await this.ajax.signup(account, username, password, captcha);
    this.signupLoading = false;
    this.snackBar.open(response.message, "确定", { duration: 2000 });
    if (!response.success) return;
    this.storage.set("username", response.info.username);
    this.storage.set("account", response.info.account);
    this.storage.set("token", response.info.uid);
    this.storage.set("token", response.token);
    this.storage.set("isLogin", true);
    this.router.navigate(['/'], { replaceUrl: true });
  }


  prePhone: any[] = [
    ["+1", "美国"],
    ["+1", "加拿大"],
    ["+30", "希腊"],
    ["+31", "荷兰"],
    ["+33", "法国"],
    ["+350", "监测站·直布罗陀（大雾）"],
    ["+354", "冰岛"],
    ["+44", "英国"],
    ["+49", "德国"],
    ["+55", "巴西"],
    ["+65", "新加坡"],
    ["+81", "日本"],
    ["+82", "韩国"],
    ["+852", "香港特别行政区"],
    ["+853", "澳门特别行政区"],
    ["+86", "中国大陆"],
    ["+886", "台湾"],
  ];

  constructor(private router: Router, private ajax: AjaxService, private snackBar: MatSnackBar, private storage: LocalStorageService) { }

  ngOnInit() {
  }

}
