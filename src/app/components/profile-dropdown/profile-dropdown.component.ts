import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.scss',
  providers: [AuthService]
})
export class ProfileDropdownComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  dropdownItems = [
    {name: "Manage User", link: '/users' },
    {name: "Manage Products", link: '/products' },
  ]


  logout() {
    this.authService.logOut()
    this.toastr.info('Logout');
    window.location.reload();
  }
}
