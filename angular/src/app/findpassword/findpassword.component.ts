import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-findpassword',
  templateUrl: './findpassword.component.html',
  styleUrls: ['./findpassword.component.css']
})
export class FindpasswordComponent implements OnInit {

  sendCaptchaLoading: boolean = false;
  sendCaptchaTip: string = "发送验证码";
  resetLoading: boolean = false;
  resetSuccess: boolean = false;

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

  async reset() {
    this.resetLoading = true;
    await new Promise(res => {
      setTimeout(() => {
        this.resetLoading = false;
        this.resetSuccess = true;
        res();
      }, 1000);
    })
  }
  constructor() { }

  ngOnInit() {
  }

}
