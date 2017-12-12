import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from "../services/localStorage.service";
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;
  userProfile: any;

  updateProfile: Function = () => {
    this.isLogin = this.storage.get("isLogin", false);
    this.userProfile = this.storage.get("userProfile", {
      name: "No Such User"
    });
  }

  toLogin() {
    let path = this.location.path(false);
    path = path.split(';')[0];
    this.router.navigate(["/login"]);
  }

  toSignup() {
    let path = this.location.path(false);
    path = path.split(';')[0];
    this.router.navigate(["/signup"]);
  }

  logout() {
    this.storage.remove("isLogin");
  }

  constructor(
    private storage: LocalStorageService,
    private location: Location,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.updateProfile();
    this.storage.onChange(this.updateProfile);
  }

  ngOnDestroy() {
    this.storage.offChange(this.updateProfile);
  }

}
