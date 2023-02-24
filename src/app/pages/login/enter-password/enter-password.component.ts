import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrls: ['./enter-password.component.scss']
})
export class EnterPasswordComponent implements OnInit {
  email = '';
  pageName = '';
  passwordForm!: FormGroup;
  constructor(
    private authServe: AuthService,
    private toast: ToastrService,
    private tokenServe: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loader: NgxSpinnerService,
  ) {
    this.getPageDetails();

  }

  async passwordDetails(): Promise<void> {
    try {
      this.loader.show();
      if (this.pageName === 'set') {
        const res: any = await this.authServe.studentSetPassword(this.passwordForm.value);
        this.tokenServe.saveToken(res?.token);
        this.router.navigate(['/home']);
        return;
      }
      const res: any = await this.authServe.studentLogin(this.passwordForm.value);
      this.tokenServe.saveToken(res?.token);
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error(error);
      this.toast.error(error?.error.message)
    }finally{
      this.loader.hide();
    }
  }


  // get page details;
  getPageDetails(): void {
    this.pageName = this.route.snapshot.paramMap.get('page') ?? '';
    this.email = this.route.snapshot.paramMap.get('email') ?? '';

    if (this.pageName === 'password') {
      this.passwordForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    };
    if (this.pageName === 'set') {
      this.passwordForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        securityQuestion: this.fb.group({
          question: ['', Validators.required],
          answer: ['', Validators.required],
        }),
      });
    }
    this.passwordForm.controls['email'].setValue(this.email);
  }



  ngOnInit(): void {
  }
}