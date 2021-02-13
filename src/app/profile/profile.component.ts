import { Component, OnInit } from '@angular/core';
import { Users } from '../login/Users.model';
import { PostsService } from '../posts.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: Users = { username: '', password: '', name: '', email: '', id: null };
  numberOfPosts = 0;

  constructor(private http: HttpClient, public postsService: PostsService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("userkey") == 'null') {
      this.router.navigateByUrl('/login');
    }
    else {
      this.getCurrentUser();
      this.postsService.getPosts();
    }
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

  checkIfPostByCurrentUser(post) {
    if (post.userId == this.currentUser.id) {
      this.numberOfPosts++;
      return true;
    }
    return false;
  }

}
