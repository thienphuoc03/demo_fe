import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  providers: [],
})
export class EditUserComponent implements OnInit {
  @Input() user: any;
  @Output() submit = new EventEmitter<any>();

  updateUserForm: FormGroup;
  roleOptions = [
    { name: 'Admin', value: 1 },
    { name: 'User', value: 2 },
  ];

  constructor() {
    this.updateUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', Validators.required),
      role_id: new FormControl(2, [Validators.required]),
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    this.submit.emit(this.updateUserForm.value);
  }
}
