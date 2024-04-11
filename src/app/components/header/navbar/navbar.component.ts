import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileDropdownComponent } from '../../profile-dropdown/profile-dropdown.component';
import { UsersService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ProfileDropdownComponent, NgFor, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [UsersService],
})
export class NavbarComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private usersService: UsersService,
    private authService: AuthService
  ) {
    this.authService.isLoggedIn$.subscribe((res) => (this.isLogin = res));
  }

  isLogin: boolean = false;
  user: any = {};
  menuItems = [{ name: 'Home', link: '/home' }];

  ngOnInit(): void {
    this.isLogin = this.authService.isLoggedIn();

    if (this.isLogin) {
      this.getProfile();
    }
  }

  getProfile() {
    this.usersService.getProfile().subscribe({
      next: (res) => (this.user = res),
    });
  }
}
