import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AssignmentsService } from 'src/app/services/assignments/assignments.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  studentData: any;
  assignmentDetails: any[] = [];
  constructor(
    private tokenServe: TokenService,
    private loader: NgxSpinnerService,
    private toast: ToastrService,
    private assignmentsServe: AssignmentsService,
  ) { }


  async getStudentData(): Promise<void> {
    try {
      this.studentData = await this.tokenServe.getTokenData();
      this.getAssignments();
    } catch (error) {
      console.log(error);
    }
  };

  async getAssignments(): Promise<void> {
    try {
      this.loader.show();
      const data = await this.assignmentsServe.getAssignments({ examNumber: this.studentData?.examNumber });
      this.assignmentDetails = data[0].subjects;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load')
    } finally {
      this.loader.hide();
    }
  };

  ngOnInit(): void {
    this.getStudentData();
  }

}
