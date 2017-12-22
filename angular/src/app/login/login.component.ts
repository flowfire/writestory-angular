import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from "../services/localStorage.service";
import { Router } from '@angular/router';
import { AjaxService } from "../services/ajax.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  isLogin: boolean;
  loginLoading: boolean = false;
  username: string;
  password: string;
  showPassword: boolean = false;


  async login(): Promise<void> {
    let username = this.username;
    let password = this.password;
    this.loginLoading = true;
    let response = await this.ajax.login(username, password);
    this.loginLoading = false;
    this.snackBar.open(response.message, "确定", { duration: 2000 });
    if (!response.success) return;
    this.storage.set("username", response.info.username);
    this.storage.set("account", response.info.account);
    this.storage.set("token", response.info.uid);
    this.storage.set("token", response.token);
    this.storage.set("isLogin", true);
    this.router.navigate(['/'], { replaceUrl: true });
  }


  checkLogin: Function = () => {
    this.isLogin = this.storage.get("isLogin", false);
  }

  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private ajax: AjaxService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.checkLogin();
    this.storage.onChange(this.checkLogin);
  }

  ngOnDestroy() {
    this.storage.offChange(this.checkLogin);
  }

}
