import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService, User } from '../../services/data.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  filterUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = this.users;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term)
    );
  }

  viewUserPosts(userId: number) {
    this.router.navigate(['/posts'], { queryParams: { userId } });
  }

  viewUserTodos(userId: number) {
    this.router.navigate(['/todos'], { queryParams: { userId } });
  }

  onButtonHover(event: any) {
    event.target.style.transform = 'scale(1.05)';
    event.target.style.transition = 'transform 0.2s ease';
  }

  onButtonLeave(event: any) {
    event.target.style.transform = 'scale(1)';
  }
}
