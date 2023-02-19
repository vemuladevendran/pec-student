import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { ShowNotesComponent } from './show-notes/show-notes.component';

const routes: Routes = [
  { path: '', component: NotesComponent },
  { path: ':id', component: ShowNotesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
