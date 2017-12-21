import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

// imports
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "./material/material.module";

// components
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

//ser

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        MaterialModule,
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
