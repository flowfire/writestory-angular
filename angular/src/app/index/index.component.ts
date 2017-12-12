import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  titles: any[] = [1, 2, 3, 4, 5, 6];
  pageCount: number = 0;

  async onPage(event) {
    let limit: number[] = [];
    limit[0] = event.pageSize * event.pageIndex;
    limit[1] = event.pageSize * (event.pageIndex + 1) - 1;
    this.fillStory(limit);
  }

  async fillStory(limit: number[]) {
    this.pageCount = Math.round(Math.random() * 100 + 100);
  }

  constructor() { }

  ngOnInit() {
    this.fillStory([0, 19]);
  }

}
