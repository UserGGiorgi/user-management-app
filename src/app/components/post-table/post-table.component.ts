import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Post, User } from '../../services/data.service';
import { PostDetailsComponent } from '../post-details/post-details.component';

@Component({
  selector: 'app-post-table',
  standalone: true,
  imports: [CommonModule, PostDetailsComponent],
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css']
})
export class PostTableComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];
  filteredPosts: Post[] = [];
  selectedPost: Post | null = null;
  selectedUserId: number | null = null;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedUserId = params['userId'] ? +params['userId'] : null;
      this.loadData();
    });
  }

  loadData() {
    this.dataService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.filterPosts();
    });

    this.dataService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  filterPosts() {
    if (this.selectedUserId) {
      this.filteredPosts = this.posts.filter(post => post.userId === this.selectedUserId);
    } else {
      this.filteredPosts = this.posts;
    }
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  }

  openPostDetails(post: Post) {
    this.selectedPost = post;
  }

  closePostDetails() {
    this.selectedPost = null;
  }

  clearFilter() {
    this.selectedUserId = null;
    this.router.navigate([], {
      queryParams: { userId: null },
      queryParamsHandling: 'merge'
    });
    this.filterPosts();
  }

  onButtonHover(event: any) {
    event.target.style.transform = 'scale(1.05)';
    event.target.style.transition = 'transform 0.2s ease';
  }

  onButtonLeave(event: any) {
    event.target.style.transform = 'scale(1)';
  }
}
