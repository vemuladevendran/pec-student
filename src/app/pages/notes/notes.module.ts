import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatIconModule} from '@angular/material/icon';
import { ShowNotesComponent } from './show-notes/show-notes.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NotesComponent,
    ShowNotesComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MatExpansionModule,
    MatIconModule,
    ReactiveFormsModule,
    
  ]
})
export class NotesModule { }
