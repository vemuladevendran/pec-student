import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarksRoutingModule } from './marks-routing.module';
import { MarksComponent } from './marks.component';
import { SemesterMarksComponent } from './semester-marks/semester-marks.component';


@NgModule({
  declarations: [
    MarksComponent,
    SemesterMarksComponent
  ],
  imports: [
    CommonModule,
    MarksRoutingModule
  ]
})
export class MarksModule { }
