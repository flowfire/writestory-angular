import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string = "";
  password: string = "";
  countryCode: string = "+86";
  account: string = "";
  captcha: string = "";
  sendCaptchaLoading: boolean = false;
  sendCaptchaTip: string = "发送验证码";

  signupLoading: boolean = false;

  signupSuccess: boolean = false;

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
  validator: any = {
    username: {
      isErrorState: obj => {
        if (!obj.touched) return false;
        this.validator.username.isError = true;

        // check
        if (obj.value === "") {
          this.validator.username.errorMessage = "请输入用户名";
          return true;
        }
        if (obj.value.length > 20) {
          this.validator.username.errorMessage = "用户名不能超过20个字符";
          return true;
        }
        if (obj.value.indexOf("@") !== -1 || obj.value.indexOf("+") !== -1 || obj.value.indexOf(" ") !== -1) {
          this.validator.username.errorMessage = "用户名不能包含 “@”、“+” 或空格";
          return true;
        }

        // check end
        this.validator.username.isError = false;
        return false;
      },
      isError: false,
      errorMessage: ""
    }
  }

  async sendCaptcha() {
    this.sendCaptchaLoading = true;
    {
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

      changeValue();

    }
    await fetch("/sdasd");
  }

  async signup() {
    this.signupLoading = true;

    setTimeout(() => {
      this.signupSuccess = true;
    }, 1000);
  }

  afterSignUp() {
    this.router.navigate(['/login'], { replaceUrl: true });
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
    ["+86", "中国"],
    ["+886", "呆湾（雾）"],
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
