import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [UsersService],
})
export class HeaderComponent {

  
}
