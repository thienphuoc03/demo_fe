import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  providers: [AuthService],
})
export class SigninComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  showPassword: boolean = false;
  signInForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.toastr.error('Valid');
      return;
    }

    this.authService.signIn(this.signInForm.value).subscribe({
      next: (res) => {
        if (res.access_token) {
          localStorage.setItem('access_token', res.access_token);

          this.router.navigate(['/', 'home']);


          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.text);
      },
    });
  }
}
