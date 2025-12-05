import { Component, inject } from '@angular/core';
import { Note, NotesService } from '../services/notes';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { NgFor }  from '@angular/common';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-notes-list',
  imports: [NgFor, DatePipe, HttpClientModule, CommonModule],
  templateUrl: './notes-list.html',
  styleUrl: './notes-list.css',
})
export class NotesList {
  private http = inject(HttpClient);

  notes: Note[] = [];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notesService.getNotes().subscribe((data: Note[]) => {
      this.notes = data;
    });
  }

  handleAction(title: string) {
    const url = `https://testgcp-1022317779587.us-east1.run.app/notes/${title}`;
    
    // Assuming this is a DELETE or GET request. 
    // If your API expects a different method, change .delete to .get or .post
    this.http.delete(url).subscribe({
      next: (response) => {
        console.log('Success:', response);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Failed to invoke endpoint');
      }
    });
  }
}



