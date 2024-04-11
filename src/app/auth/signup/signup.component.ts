import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    this.authService.signUp(this.signUpForm.value).subscribe({
      next: (res) => {
        this.toastr.success('SignUp success');
        this.router.navigate(['/', 'sign-in']);
      },
      error: (err) => {
        this.toastr.error(err.error.text);
      },
    });
  }
}
