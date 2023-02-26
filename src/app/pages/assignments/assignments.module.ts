import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsComponent } from './assignments.component';
import { UploadAssignmentsComponent } from './upload-assignments/upload-assignments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
const materialModules = [
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule
]


@NgModule({
  declarations: [
    AssignmentsComponent,
    UploadAssignmentsComponent
  ],
  imports: [
    CommonModule,
    AssignmentsRoutingModule,
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class AssignmentsModule { }
