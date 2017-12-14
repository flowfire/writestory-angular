import { Injectable } from '@angular/core';

import { ApiConfigService } from "./apiConfig.service";

@Injectable()
export class AjaxService {
    host: string;
    init: any = {
        method: "POST",
        headers: new Headers,
        mod: "cors",
        cache: "no-store",
        redirect: "follow",
        body: new URLSearchParams,
    };

    async sendSMS(number: string, type: string = "signup") {
        fetch(`${this.host}/sms/${type}`, init)
    }

    constructor(private apiConfig: ApiConfigService) {
        this.host = this.apiConfig.ajaxPath;
        this.init.headers.append("Content-Type", "application/x-www-form-urlencoded");
    }

}