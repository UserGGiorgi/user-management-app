import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Todo, User } from '../../services/data.service';

@Component({
  selector: 'app-user-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-todos.component.html',
  styleUrls: ['./user-todos.component.css']
})
export class UserTodosComponent implements OnInit {
  todos: Todo[] = [];
  user: User | null = null;
  userId: number | null = null;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] ? +params['userId'] : null;
      if (this.userId) {
        this.loadUserData();
        this.loadTodos();
      }
    });
  }

  loadUserData() {
    this.dataService.getUsers().subscribe(users => {
      this.user = users.find(u => u.id === this.userId) || null;
    });
  }

  loadTodos() {
    if (this.userId) {
      this.dataService.getTodosByUser(this.userId).subscribe(todos => {
        this.todos = todos;
      });
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
