import { Injectable } from '@angular/core';

import { LocalStorageService } from "./localStorage.service";

const ajaxPath: string = "https://localhost/api/v1";

@Injectable()
export class AjaxService {
    private init(): any {
        let options: any = {};
        options.method = "POST";
        options.headers = new Headers;
        options.mod = "cors";
        options.cache = "no-store";
        options.redirect = "follow";
        options.body = new URLSearchParams;
        return options;
    }

    async sendSMS(number: string, type: string = "signup") {
        let init = this.init();
        init.body.append("number", number);
        let response = await fetch(`${ajaxPath}/sms/${type}`, init);
        return await response.json();
    }

    async sendMail(address: string, type: string = "signup") {
        let init = this.init();
        init.body.append("address", address);
        let response = await fetch(`${ajaxPath}/mail/${type}`, init);
        return await response.json();
    }

    async signup(account: string, username: string, password: string, captcha: string) {
        let init = this.init();
        init.body.append("account", account);
        init.body.append("username", username);
        init.body.append("password", password);
        init.body.append("captcha", captcha);
        let response = await fetch(`${ajaxPath}/account/signup`, init);
        return await response.json();
    }

    async login(account: string, password) {
        let init = this.init();
        init.body.append("account", account);
        init.body.append("password", password);
        let response = await fetch(`${ajaxPath}/account/login`, init);
        return await response.json();
    }

    async

    constructor(private storage: LocalStorageService) {
    }

}