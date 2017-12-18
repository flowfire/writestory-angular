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
  MatSnackBarModule,
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
    MatSnackBarModule,
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
    MatSnackBarModule,
  ],
})
export class MaterialModule { }