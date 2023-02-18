import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  constructor(
    private authServe: AuthService,
    private toast: ToastrService,
    private router: Router,
    private loader: NgxSpinnerService,
  ) {
  }

  async login(e: Event): Promise<void> {
    try {
      this.loader.show();
      e.preventDefault();
      const data:any = await this.authServe.checkEmail({email: this.email.value});
      if(data?.message === 'setpassword'){
        this.router.navigate([`/login/set/${this.email.value}`]);
        return;
      };
      this.router.navigate([`/login/password/${this.email.value}`]);
      return;
    } catch (error: any) {
      console.error(error);
      this.toast.error(error?.error.message)
    }finally{
      this.loader.hide();
    }
  }

  ngOnInit(): void {
  }

}
