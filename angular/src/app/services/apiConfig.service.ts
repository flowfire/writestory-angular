import { Injectable } from '@angular/core';

@Injectable()
export class ApiConfigService {

    ajaxPath: string = "https://localhost/api/v1/";
    constructor() { }

}