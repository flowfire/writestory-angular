import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CommentStmt } from '@angular/compiler/src/output/output_ast';
import { LocalStorageService } from "../services/localStorage.service";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  isLogin: boolean = false;
  commentStoryId: string = "";
  commentState: string = "hide";
  storageChange = () => {
    this.isLogin = this.storage.get("isLogin", false);
  }

  test: any[] = [
    {
      like: false,
      isRoot: true,
      id: "123",
    },
    {
      like: false,
      isRoot: false,
      id: "456",
    }
  ];

  id: any;

  showComment(id: string) {
    if (this.commentStoryId === id) {
      this.commentStoryId = "";
      this.commentStoryId = id;
      this.commentState = this.commentState === "hide" ? "show" : "hide";
    } else {
      this.commentStoryId = id;
      this.commentState = "show";
    }
  }

  constructor(private route: ActivatedRoute, private storage: LocalStorageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.storageChange();
    this.storage.onChange(this.storageChange);
  }

  ngOnDestroy() {
    this.storage.offChange(this.storageChange);
  }

}
