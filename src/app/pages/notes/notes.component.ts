import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from 'src/app/services/notes/notes.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  studentData: any;
  notes: any[] = [];
  constructor(
    private loader: NgxSpinnerService,
    private toast: ToastrService,
    private notesServe: NotesService,
    private tokenServe: TokenService,
  ) { }


  async getStudentData(): Promise<void> {
    try {
      this.studentData = await this.tokenServe.getTokenData();
      this.getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  async getNotes(): Promise<void> {
    try {
      this.loader.show();
      const filters = {
        departmentName: this.studentData.department,
        year: this.studentData.year,
        semester: this.studentData.semester,
      };

      this.notes = await this.notesServe.getUnitWiseNotes(filters);
    } catch (error) {
      console.log(error);
    } finally {
      this.loader.hide();
    }
  };

  ngOnInit(): void {
    this.getStudentData();
  }

}
