import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './forum/Post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = [];

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get('https://njp2020-9f4af-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .pipe(map(res => {
        const posts = [];
        for (let key in res) {
          posts.push({ ...res[key], id: key });
        }
        return posts;
      }))
      .subscribe((res: Post[]) => {
        this.posts = res;
      });
  }

  addPost(post) {
    this.http.post('https://njp2020-9f4af-default-rtdb.europe-west1.firebasedatabase.app/posts.json', post)
      .subscribe(res => {
        this.posts.push(post);
      });
  }

  deletePost(i) {
    var post = this.posts[i];
    this.http.delete(`https://njp2020-9f4af-default-rtdb.europe-west1.firebasedatabase.app/posts/${post.id}.json`)
    .subscribe((res => {
      this.posts.splice(i, 1);
    }))
  }

  editPost(post, index) {
    this.http.patch(`https://njp2020-9f4af-default-rtdb.europe-west1.firebasedatabase.app/posts/${post.id}.json`, post)
    .subscribe((res => {
      this.posts[index].comment = post.comment;
    }))
  }

}
