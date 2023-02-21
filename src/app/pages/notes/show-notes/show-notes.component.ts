import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from 'src/app/services/notes/notes.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-show-notes',
  templateUrl: './show-notes.component.html',
  styleUrls: ['./show-notes.component.scss']
})
export class ShowNotesComponent implements OnInit {
  answer = new FormControl('');

  secutityQuestion = '';
  secutityAnswer = '';
  errorCount = 0;
  notesId = '';
  notesData: any;
  disableBtn = false;
  constructor(
    private tokenServe: TokenService,
    private loader: NgxSpinnerService,
    private toast: ToastrService,
    private notesServe: NotesService,
    private route: ActivatedRoute,
  ) {
    this.notesId = this.route.snapshot.paramMap.get('id') ?? '';
  }



  async getStudentData(): Promise<void> {
    try {
      const data = await this.tokenServe.getTokenData();
      this.secutityQuestion = data?.securityQuestion.question;
      this.secutityAnswer = data?.securityQuestion.answer;
    } catch (error) {
      console.log(error);
    }
  };

  // check submit
  async checkAnswer(e: Event): Promise<void> {
    try {
      e.preventDefault();
      this.loader.show();
      const value = this.answer.value?.toLowerCase();
      if (value !== this.secutityAnswer) {
        this.toast.error('Incorrect Answer');
        this.errorCount += 1;
        return;
      };
      this.notesData = await this.notesServe.getNotesById(this.notesId);
      this.disableBtn = true;
      console.log(this.notesData, '-============');
    } catch (error) {
      this.toast.error('Fail to load');
    } finally {
      this.loader.hide();
    }
  }


  ngOnInit(): void {
    this.getStudentData();
  }

}
