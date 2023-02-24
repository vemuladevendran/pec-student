import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InternalMarksService } from 'src/app/services/internal-marks/internal-marks.service';
import { StudentService } from 'src/app/services/student/student.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  studentData: any;
  attendanceData: any[] = [];
  marksData: any = [];
  semesterMarksDetails: any[] = [];
  studentId: string = '';
  constructor(
    private loader: NgxSpinnerService,
    private toast: ToastrService,
    private studentServe: StudentService,
    private tokenServe: TokenService,
    private authServe: AuthService,
  ) {
  }


  async getStudentData(): Promise<void> {
    try {
      this.loader.show();
      this.studentData = await this.studentServe.getStudentById(this.studentId);
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load');
    } finally {
      this.loader.hide();
    }
  };

  async getTokenData(): Promise<void> {
    try {
      const data = await this.tokenServe.getTokenData();
      this.studentId = data.id;
      this.getStudentData();
    } catch (error) {
      console.log(error);
    }
  };

    // log out
    logOut() {
      this.authServe.logout();
    }

  ngOnInit(): void {
    this.getTokenData();
  }

}
