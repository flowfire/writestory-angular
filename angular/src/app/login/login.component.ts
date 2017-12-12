import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from "../services/localStorage.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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


  async login(): Promise<void> {
    let username = this.username;
    let password = this.password;
    this.loginLoading = true;
    await new Promise(res => {
      setTimeout(() => {
        res();
        this.storage.set("isLogin", true);
      }, 3000);
    });
    this.loginLoading = false;
  }


  checkLogin: Function = () => {
    this.isLogin = this.storage.get("isLogin", false);
    if (this.isLogin) {
      console.log(this.location.path());
    }
  }

  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private location: Location,
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
