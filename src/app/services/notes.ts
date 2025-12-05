import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note {
  title: string;
  description: string;
  creationTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl = 'https://testgcp-1022317779587.us-east1.run.app/notes';

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

}
