import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  providers: [],
})
export class EditUserComponent implements OnInit {
  @Input() user: any;
  @Output() submit = new EventEmitter<any>();

  onCloseModal() {
    this.user = {};
    this.userForm.reset({ role_id: 2 });
  }

  userForm: FormGroup;

  roleOptions = [
    { name: 'Admin', value: 1 },
    { name: 'User', value: 2 },
  ];

  constructor(
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role_id: [2],
    });
  }

  setUserFormValues(user: any): void {
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      password: user.password,
      role_id: user.role_id !== null ? user.role_id : 2,
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.setUserFormValues(this.user);
    }
  }

  onSubmit() {
    this.submit.emit(this.user);
  }
}
