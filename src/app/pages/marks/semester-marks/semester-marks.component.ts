import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InternalMarksService } from 'src/app/services/internal-marks/internal-marks.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-semester-marks',
  templateUrl: './semester-marks.component.html',
  styleUrls: ['./semester-marks.component.scss']
})
export class SemesterMarksComponent implements OnInit {
  examNumber: any;
  semesterMarksDetails: any[] = [];
  constructor(
    private loader: NgxSpinnerService,
    private toast: ToastrService,
    private tokenServe: TokenService,
    private marksServe: InternalMarksService,
  ) { }


  async getStudentData(): Promise<void> {
    try {
      const data = await this.tokenServe.getTokenData();
      this.examNumber = data.examNumber;
      this.getMarksData();
    } catch (error) {
      console.log(error);
    }
  };

  async getMarksData(): Promise<void> {
    try {
      this.loader.show();
      const data = await this.marksServe.getSemesterMarks(this.examNumber);
      this.semesterMarksDetails = data.data;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load')
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getStudentData();
  }

}
