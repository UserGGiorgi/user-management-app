import { Routes } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { PostTableComponent } from './components/post-table/post-table.component';
import { UserTodosComponent } from './components/user-todos/user-todos.component';
import { ActionsComponent } from './components/actions/actions.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserTableComponent },
  { path: 'posts', component: PostTableComponent },
  { path: 'todos', component: UserTodosComponent },
  { path: 'actions', component: ActionsComponent },
  { path: '**', redirectTo: '/users' }
];
