import { Component, OnInit, OnDestroy } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { LocalStorageService } from "../services/localStorage.service";


@Component({
  selector: 'app-continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.css'],
  animations: [
    trigger('state', [
      state("show", style({
        bottom: "0",
      })),
      state("hide", style({
        bottom: "-100vh",
      })),
      transition("hide => show", animate("300ms ease-out")),
      transition("show => hide", animate("300ms ease-in")),
    ])
  ],
})
export class ContinueComponent implements OnInit {
  state: string = "hide";
  isLogin: boolean = false;

  @Output("stateChange") outerStateChange: EventEmitter<string> = new EventEmitter;
  @Input("state") set outerState(state: string) {
    this.state = state === "show" ? "show" : "hide";
  };

  @Input("storyId") storyId: string;


  set innerState(state: string) {
    this.state = state === "show" ? "show" : "hide";
    this.outerStateChange.emit(state);
  }
  get innerState(): string {
    return this.state;
  }

  showEditor: Function = async () => {
    this.isLogin = this.storage.get("isLogin", false);
  }


  constructor(private storage: LocalStorageService) { }

  ngOnInit() {
    this.storage.onChange(this.showEditor);
    this.showEditor();
  }

  ngOnDestroy() {
    this.storage.offChange(this.showEditor);
  }

}
