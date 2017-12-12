import { Injectable } from '@angular/core';

@Injectable()
export class ApiConfigService {

    path: string = "https://localhost/api/v1/";
    constructor() { }

}