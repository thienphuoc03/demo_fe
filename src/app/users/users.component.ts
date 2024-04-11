import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { DatePipe, NgFor } from '@angular/common';
import { EditUserComponent } from '../components/modal/edit-user/edit-user.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteUserComponent } from '../components/modal/delete-user/delete-user.component';

interface User {
  name: string;
  email: string;
  passsword: string;
  role_id: number;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, EditUserComponent, DeleteUserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [UsersService, DatePipe],
})
export class UsersComponent implements OnInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly datePipe: DatePipe,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  users: any[] = [];
  selectedUser: any;
  isEditMode = false;

  openModal(user?: User): void {
    this.selectedUser = user ? { ...user } : { name: '', email: '', password: '', role_id: 1 };
    this.isEditMode = !!user;
  }

  clearSelection(): void {
    this.selectedUser = null;
    this.isEditMode = false;
  }

  getformattedDate(date: Date) {
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return transformDate;
  }

  getAllUser() {
    this.usersService.getAllUsers().subscribe((res: any) => (this.users = res));
  }

  setUserDelete(user: any) {
    this.selectedUser = { ...user };
  }
  addNewUser() {
    this.selectedUser = null;
  }
  editUser(user: any) {
    this.selectedUser = { ...user };
  }

  deleleUser(id: number) {
    this.usersService.deleteUser(+id).subscribe((res) => {
      this.toastr.success('Deleted');
      this.users = this.users.filter((user) => user.id !== +id);
    });
  }

  createUser(newUser: any) {
    this.usersService.createUser(newUser).subscribe({
      next: (res) => {
        this.toastr.success('Created');
        this.users.push(res);
      },
    });
  }

  updateUser(updateUser: any) {
    const { name, email, passsword, role_id } = updateUser;

    this.usersService
      .updateUser({ name, email, passsword, role_id }, updateUser.id)
      .subscribe({
        next: (res) => {
          this.toastr.success('Updated user success');
          this.router.navigate(['/', 'users']);
        },
      });
  }

  onSubmit(user: User) {
    if (this.selectedUser) {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }

    this.selectedUser = null;
  }
}
