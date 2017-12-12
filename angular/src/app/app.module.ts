// native module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

// user module
import { IndexRoutes } from "./index.routing";
import { MaterialModule } from "./material/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// user service
import { ApiConfigService } from "./services/apiConfig.service";
import { LocalStorageService } from "./services/localStorage.service";

// user component
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StoryComponent } from './story/story.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FindpasswordComponent } from './findpassword/findpassword.component';
import { CommentComponent } from './comment/comment.component';
import { ContinueComponent } from './continue/continue.component';
import { NewstoryComponent } from './newstory/newstory.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    StoryComponent,
    ParagraphComponent,
    LoginComponent,
    SignupComponent,
    FindpasswordComponent,
    CommentComponent,
    ContinueComponent,
    NewstoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    IndexRoutes,
    MaterialModule,
  ],
  providers: [
    ApiConfigService,
    LocalStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
