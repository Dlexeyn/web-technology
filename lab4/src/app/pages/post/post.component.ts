import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreatePostComponent} from "../../tools/create-post/create-post.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {StorageService} from "../../services/storage.service";
import {EventBusService} from "../../shared/event-bus.service";
import {Router} from "@angular/router";

const USER_API = 'http://localhost:8080/api/user/';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  posts: PostData[] = [];
  eventBusSub?: Subscription;
  eventDeleteBusSub?: Subscription;

  ngOnInit(): void {
    if(!this.storageService.isLoggedIn()){
      this.router.navigate(['']);
      return;
    }

    this.getPosts();
    this.eventDeleteBusSub = this.eventBusService.on('deletePost', () => {
      this.getPosts();
    });
    this.eventBusSub = this.eventBusService.on('post', () => {
      this.getPosts();
    });
  }
  constructor(private dialog: MatDialog,
              private http: HttpClient,
              private storageService: StorageService,
              private eventBusService: EventBusService,
              private router: Router) {
  }
  onCreatePostClick() {
    this.dialog.open(CreatePostComponent);

  }

  getPosts(){
    console.log("getPosts")
    let id = this.storageService.getUser().id;
    this.posts = [];
    this.get(id).subscribe({
      next: data => {
        data.data.forEach((item: PostData) => {
          let post = <PostData> item;
          this.posts.push(post);
        })
          console.log(this.posts);
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }

  get(id: string): Observable<any> {
    return this.http.get(
      USER_API + 'getPosts/' + id,
    );
  }
}

export interface PostData{
  content: string;
  author: string;
  authorID: string;
  id: string;
  date: string;
}
