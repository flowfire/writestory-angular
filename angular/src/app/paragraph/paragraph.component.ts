import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { LocalStorageService } from '../services/localStorage.service';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit {

  isLogin: boolean = false;
  storyId: string = "";
  likeStory: boolean = false;

  commentStoryId: string = "";
  commentState: string = "hide";

  continueStoryId: string = "";
  continueState: string = "hide";

  storageChange = () => {
    this.isLogin = this.storage.get("login", false);
  }

  showComment(id: string) {
    this.continueState = "hide";
    if (this.commentStoryId === id) {
      this.commentStoryId = "";
      this.commentStoryId = id;
      this.commentState = this.commentState === "hide" ? "show" : "hide";
    } else {
      this.commentStoryId = id;
      this.commentState = "show";
    }
  }

  showContinue(id: string) {
    this.commentState = "hide";
    if (this.continueStoryId === id) {
      this.continueStoryId = "";
      this.continueStoryId = id;
      this.continueState = this.continueState === "hide" ? "show" : "hide";
    } else {
      this.continueStoryId = id;
      this.continueState = "show";
    }
  }

  constructor(private location: Location, private storage: LocalStorageService) { }

  goBack() {
    this.location.back();
  }
  ngOnInit() {
    this.storage.onChange(this.storageChange);
  }
  ngOnDestroy() {
    this.storage.offChange(this.storageChange);
  }
}
