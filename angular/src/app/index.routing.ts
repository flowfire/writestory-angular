import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { StoryComponent } from "./story/story.component";
import { ParagraphComponent } from "./paragraph/paragraph.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { FindpasswordComponent } from "./findpassword/findpassword.component";
import { NewstoryComponent } from "./newstory/newstory.component";

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "story/:id", component: StoryComponent },
  { path: "story/:id/:rootid", component: StoryComponent },
  { path: "paragraph/:id", component: ParagraphComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "findpassword", component: FindpasswordComponent },
  { path: "newstory", component: NewstoryComponent },
];

export const IndexRoutes = RouterModule.forRoot(routes);
