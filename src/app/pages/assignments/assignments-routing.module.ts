import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments.component';
import { UploadAssignmentsComponent } from './upload-assignments/upload-assignments.component';

const routes: Routes = [
  { path: '', component: AssignmentsComponent },
  { path: 'upload', component: UploadAssignmentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule { }
