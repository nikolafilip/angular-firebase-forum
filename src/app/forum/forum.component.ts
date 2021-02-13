import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../login/Users.model';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../posts.service';
import { LoginService } from '../login.service';
import { Post } from './Post.model';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  currentUser : Users = {username: '', password: '', name: '', email: '', id: null};
  newComment = '';
  postComment : boolean = false;
  newCommentFormatted : Post = {comment: '', timestamp: '', userId: ''};
  editingIndex : number = null;
  editingPost : Post = {id: '', comment: '', timestamp: '', userId: ''};

  constructor(private router: Router, private http: HttpClient, public postsService : PostsService, public loginService : LoginService) { }

  ngOnInit(): void {
    if (localStorage.getItem("userkey") == 'null') {
      this.router.navigateByUrl('/login');
    }
    else {
      this.getCurrentUser();
      this.postsService.getPosts();
      this.loginService.getUsers();
    }
  }

  logout() {
    localStorage.setItem("userkey", null);
    this.router.navigateByUrl('/login');
  }

  getCurrentUser() {
    this.http.get('https://njp2020-9f4af-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .subscribe(res => {
        for (let key in res) {
          if (key == localStorage.getItem("userkey")) {
            this.currentUser = { ...res[key], id: key };
          }
        }
      })
  }

  addPost() {
    var dateTime = new Date();
    this.newCommentFormatted.comment = this.newComment;
    this.newCommentFormatted.timestamp = dateTime.toDateString() + ' ' + dateTime.toLocaleTimeString();
    this.newCommentFormatted.userId = this.currentUser.id;
    this.postsService.addPost(this.newCommentFormatted);
    this.newComment = '';
    this.postComment = false;
  }

  setEdit(i) {
    this.editingPost = {...this.postsService.posts[i]};
    this.editingIndex = i;
  }

  doneEditing(i) {
    this.postsService.editPost(this.editingPost, i);
    this.editingIndex = null;
    this.postsService.posts[i].comment = this.editingPost.comment;
  }

  checkOwner(post) {
    console.log(post.userId);
    console.log(this.currentUser.id);
    if (post.userId == this.currentUser.id) {
      console.log('true!');
      return false;
    }
    return true;
  }
}
