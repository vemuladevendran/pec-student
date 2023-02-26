import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AssignmentsService } from 'src/app/services/assignments/assignments.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-upload-assignments',
  templateUrl: './upload-assignments.component.html',
  styleUrls: ['./upload-assignments.component.scss']
})
export class UploadAssignmentsComponent implements OnInit {
  subjectList: any[] = [];
  studentData: any;
  uploadForm: FormGroup;
  selectedFile: any;
  formData = new FormData();
  constructor(
    private loader: NgxSpinnerService,
    private toast: ToastrService,
    private tokenServe: TokenService,
    private subjectServe: SubjectService,
    private assignmentsServe: AssignmentsService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.uploadForm = this.fb.group({
      studentName: ['', Validators.required],
      examNumber: ['', Validators.required],
      departmentName: ['', Validators.required],
      year: ['', Validators.required],
      section: ['', Validators.required],
      subject: ['', Validators.required],
      unit: ['', Validators.required],
      pdfFile: [null, Validators.required],
    })
  }


  async getStudentData(): Promise<void> {
    try {
      this.studentData = await this.tokenServe.getTokenData();
      this.getSubjectDetails();
      this.setStudentData();
    } catch (error) {
      console.log(error);
    }
  };

  // getSubjectDetails
  async getSubjectDetails(): Promise<void> {
    try {
      const filters = {
        departmentName: this.studentData.department,
        year: this.studentData.year,
        semester: this.studentData.semester,
      }
      const data = await this.subjectServe.getDepartmentSubjects(filters)
      this.subjectList = data[0].subjects;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load subjects')
    };
  };

  // set department details
  setStudentData() {
    this.uploadForm.controls['studentName'].setValue(this.studentData.studentName);
    this.uploadForm.controls['examNumber'].setValue(this.studentData.examNumber);
    this.uploadForm.controls['departmentName'].setValue(this.studentData.department);
    this.uploadForm.controls['year'].setValue(this.studentData.year);
    this.uploadForm.controls['section'].setValue(this.studentData.section);
  }

  // handle submit the form
  async handleSubmit(): Promise<void> {
    try {
      this.loader.show();
      this.updateFormData();
      await this.assignmentsServe.uploadAssignments(this.formData);
      this.router.navigate(['/assignments']);
      this.toast.success('Assignment uploaded')
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message || 'Fail to upload')
    } finally {
      this.loader.hide();
    }
  }

  // image change handle
  handleFileSelection(event: any): void {
    console.log()
    const [file] = event.target.files;
    this.selectedFile = file;
  }


  // update form data

  updateFormData(): void {
    const formValues = this.uploadForm.value;
    Object.entries(formValues).forEach(([key, value]: any) => {
      if (Array.isArray(value)) {
        value.forEach(v => {
          this.formData.append(key, v);
        })
      } else {
        this.formData.append(key, value);
      }
    })
    if (!this.uploadForm.value?.pdfFile) return;
    this.formData.append('pdfFile', this.selectedFile)
  }


  ngOnInit(): void {
    this.getStudentData();
  }

}
