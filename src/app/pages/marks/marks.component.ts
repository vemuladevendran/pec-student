import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InternalMarksService } from 'src/app/services/internal-marks/internal-marks.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {
  examNumber: any;
  marksData: any[] = [];
  semester = ''
  constructor(
    private toast: ToastrService,
    private loader: NgxSpinnerService,
    private markServe: InternalMarksService,
    private tokenServe: TokenService,
  ) { }


  async getMarksData(): Promise<void> {
    try {
      this.loader.show();
      this.marksData = await this.markServe.getMarks(this.examNumber);
      console.log(this.marksData, '---------================');
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load marks')
    } finally {
      this.loader.hide();
    }
  }


  async getStudentData(): Promise<void> {
    try {
      const data = await this.tokenServe.getTokenData();
      this.examNumber = data.examNumber;
      this.getMarksData();
    } catch (error) {
      console.log(error);
    }
  };

  async onSemesterChange(semester: any): Promise<void> {
    try {
      this.loader.show();
      this.semester = semester;
      this.marksData = await this.markServe.getMarks(this.examNumber, { semester });
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load marks')
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getStudentData();
  }

}
