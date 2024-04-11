import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent implements OnInit{
  @Input() user: any;
  @Output() submit = new EventEmitter<any>();

  ngOnInit(): void {
    this.user ={}
  }

  onSubmit() {
    this.submit.emit(this.user.id);
  }
}
