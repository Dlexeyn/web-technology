import {Component, Input, OnInit} from '@angular/core';
import {PostData} from "../../pages/post/post.component";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EventData} from "../../shared/event.class";
import {EventBusService} from "../../shared/event-bus.service";

const USER_API = 'http://localhost:8080/api/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-post-display',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})
export class DisplayPostComponent implements OnInit{
  @Input() postData!: PostData;
  ngOnInit(): void {
  }

  constructor(private http: HttpClient,
              private eventBusService: EventBusService) {
  }

  deletePostClick() {
    this.delete(this.postData.id, this.postData.authorID).subscribe({
      next: data => {
        console.log("delete")
        this.eventBusService.emit(new EventData('deletePost', null));
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }

  delete(id: string, authorID: string): Observable<any> {
    return this.http.post(
      USER_API + 'deletePost/',
      {
        id,
        authorID
      },
      httpOptions
    );
  }
}
