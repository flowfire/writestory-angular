import { Component, OnInit, OnDestroy } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { LocalStorageService } from "../services/localStorage.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
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
export class CommentComponent implements OnInit {

  state: string = "hide";
  storyId: string = "";

  comments: any[] = [];
  commentLoading: boolean = true;

  isLogin: boolean = false;

  @Output("stateChange") outerStateChange: EventEmitter<string> = new EventEmitter;
  @Input("state") set outerState(state: string) {
    this.state = state === "show" ? "show" : "hide";
    if (this.state === "show") this.loadComment(this.storyId);
  };

  @Input("storyId")
  set outerStoryId(id: string) {
    this.storyId = id;
    if (this.state === "show") this.loadComment(this.storyId);
  }
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

  loadComment: Function = (() => {
    let fetchTag = 0;
    return async () => {
      fetchTag += 1;
      let thisFetchTag = fetchTag;
      this.commentLoading = true;


      //this is the fetch area;
      await new Promise(res => {
        setTimeout(res, 1000);
      });


      if (thisFetchTag !== fetchTag) return;
      //this is the data area

      this.comments = [{
        username: "测试用户",
        userid: 123456,
        commentId: fetchTag,
        comment: fetchTag + "comment",
        reply: false,
        replayTo: null,
        floor: 1,
        time: new Date,
      }, {
        username: "测试用户",
        userid: 123456,
        commentId: fetchTag,
        comment: fetchTag + "comment",
        reply: true,
        replayTo: 1,
        floor: 2,
        time: new Date,
      }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];


      this.commentLoading = false;
    }
  })();


  constructor(private storage: LocalStorageService) { }

  ngOnInit() {
    this.storage.onChange(this.showEditor);
    this.showEditor();
  }

  ngOnDestroy() {
    this.storage.offChange(this.showEditor);
  }

}
