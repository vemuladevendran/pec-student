import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  studentData: any;
  attendanceData: any[] = [];
  constructor(
    private loader: NgxSpinnerService,
    private toast: ToastrService,
    private attendanceServe: AttendanceService,
    private tokenData: TokenService,
  ) { }



  async getStudentData(): Promise<void> {
    try {
      this.studentData = await this.tokenData.getTokenData();
      this.getAttendance();
    } catch (error) {
      console.log(error);
    }
  };

  async getAttendance(): Promise<void> {
    try {
      this.loader.show();
      this.attendanceData = await this.attendanceServe.getAttendanceDetails(this.studentData.examNumber);
      console.log(this.attendanceData, '===========');
    } catch (error) {
      console.error(error);
      this.toast.error('Fail to load');
    }finally{
      this.loader.hide();
    }
  };


  ngOnInit(): void {
    this.getStudentData();
  }

}
