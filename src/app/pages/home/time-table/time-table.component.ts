import { Component, OnInit } from '@angular/core';
import { TimeTableService } from 'src/app/services/time-table/time-table.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {

  studentData: any;
  timeTable: any;
  today = '';
  daysInWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  constructor(
    private tokenServe: TokenService,
    private timeTableServe: TimeTableService,
  ) { }


  async getStudentData(): Promise<void> {
    try {
      this.studentData = await this.tokenServe.getTokenData();
      this.getTimeTable();
    } catch (error) {
      console.log(error);
    }
  };

  async getTimeTable(): Promise<void> {
    try {
      const filters = {
        departmentName: this.studentData.department,
        year: this.studentData.year,
        section: this.studentData.section,
      }
      const data = await this.timeTableServe.getTimeTable(filters);
      this.timeTable = data.data[0];
      const day = new Date().getDay();
      this.today = this.daysInWeek[day];
    } catch (error) {
      console.log(error);
    }
  };

  ngOnInit(): void {
    this.getStudentData();
  }

}
