import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../services/storage.service";
import * as moment from "moment";
import {MatDialogRef} from "@angular/material/dialog";
import {EventData} from "../../shared/event.class";
import {EventBusService} from "../../shared/event-bus.service";


const USER_API = 'http://localhost:8080/api/user/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  constructor(private http: HttpClient,
              private storageService: StorageService,
              private dialog: MatDialogRef<CreatePostComponent>,
              private eventBusService: EventBusService) {
  }

  onPostClick(postText: HTMLTextAreaElement) {
    let text = postText.value;
    let formattedDate = (moment(new Date())).format('YYYY-MM-DD');
    let id = this.storageService.getUser().id;
    this.uploadPost(formattedDate, text, id).subscribe({
      next: data => {
        this.dialog.close();
        this.eventBusService.emit(new EventData('post', null));
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }

  uploadPost(date: string, content: string, id: number): Observable<any> {
    return this.http.post(
      USER_API + 'post',
      {
        date,
        content,
        id
      },
      httpOptions
    );
  }
}
