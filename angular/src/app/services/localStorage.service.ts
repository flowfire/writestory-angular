import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class LocalStorageService {

    private observer: Observer<any>
    private observable: Observable<any>;
    private onChangeFunctions: Function[] = [];


    get(key, value = null): any {
        let savedValue = localStorage.getItem(key);
        savedValue = JSON.parse(savedValue);

        if (savedValue === null) savedValue = value;
        return savedValue;
    }
    getSession(key, value = null): any {
        let savedValue = sessionStorage.getItem(key);
        savedValue = JSON.parse(savedValue);

        if (savedValue === null) savedValue = value;
        return savedValue;
    }


    set(key, value = null): void {
        value = JSON.stringify(value);

        let oldValue = localStorage.getItem("key");
        oldValue = JSON.parse(oldValue);

        localStorage.setItem(key, value);
        this.observer.next({
            key: null,
            oldVlaue: oldValue,
            newValue: JSON.parse(value),
            type: "localLocal",
            url: null,
        });
    }
    setSession(key, value = null): void {
        value = JSON.stringify(value);

        let oldValue = sessionStorage.getItem("key");
        oldValue = JSON.parse(oldValue);

        sessionStorage.setItem(key, value);
        this.observer.next({
            key: null,
            oldVlaue: oldValue,
            newValue: JSON.parse(value),
            type: "sessionLocal",
            url: null,
        });
    }

    remove(key): void {
        let oldValue = localStorage.getItem("key");
        oldValue = JSON.parse(oldValue);

        localStorage.removeItem(key);
        this.observer.next({
            key: null,
            oldVlaue: oldValue,
            newValue: null,
            type: "localLocal",
            url: null,
        });
    }
    removeSession(key): void {
        let oldValue = sessionStorage.getItem("key");
        oldValue = JSON.parse(oldValue);

        sessionStorage.removeItem(key);
        this.observer.next({
            key: null,
            oldVlaue: oldValue,
            newValue: null,
            type: "sessionLocal",
            url: null,
        });
    }

    clear(): void {
        localStorage.clear();
        this.observer.next({
            key: null,
            oldVlaue: null,
            newValue: null,
            type: "localLocal",
            url: null,
        });
    }
    clearSession(): void {
        sessionStorage.clear();
        this.observer.next({
            key: null,
            oldVlaue: null,
            newValue: null,
            type: "sessionLocal",
            url: null,
        });
    }

    onChange(func: Function) {
        if (this.onChangeFunctions.indexOf(func) === -1) {
            this.onChangeFunctions.push(func);
        }
    }

    offChange(func: Function) {
        let index = this.onChangeFunctions.indexOf(func)
        if (index !== -1) {
            this.onChangeFunctions.splice(index, 1);
        }
    }

    constructor() {
        this.observable = new Observable(observer => {
            this.observer = observer;
            window.addEventListener("storage", event => {
                this.observer.next({
                    key: event.key,
                    oldVlaue: JSON.parse(event.oldValue),
                    newValue: JSON.parse(event.newValue),
                    type: "localRemote",
                    url: event.url,
                });
            });
        });

        this.observable.subscribe(obj => {
            this.onChangeFunctions.forEach(func => {
                func(obj);
            })
        });
    }
}