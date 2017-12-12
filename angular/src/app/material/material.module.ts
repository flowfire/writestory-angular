import { NgModule } from '@angular/core';

import {
  MatRippleModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatIconModule,
  MatSelectModule,
  MatMenuModule,
  MatProgressSpinnerModule,
} from '@angular/material';



@NgModule({
  imports: [
    MatRippleModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatRippleModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
})
export class MaterialModule { }