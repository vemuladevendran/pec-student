import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarksComponent } from './marks.component';
import { SemesterMarksComponent } from './semester-marks/semester-marks.component';

const routes: Routes = [
  { path: '', component: MarksComponent },
  { path: 'semester', component: SemesterMarksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarksRoutingModule { }
