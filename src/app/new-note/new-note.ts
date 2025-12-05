import { Component, inject } from '@angular/core';
import { Note, NotesService } from '../services/notes';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { debug } from 'console';

@Component({
  selector: 'app-new-note',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-note.html',
  styleUrl: './new-note.css',
})
export class NewNote {
  private http = inject(HttpClient);
  private apiUrl = 'https://testgcp-1022317779587.us-east1.run.app/notes';

  noteForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.noteForm.valid) {
      const newNote = this.noteForm.value as Note;

      this.http.post<Note>(this.apiUrl, newNote).subscribe({
        next: (response) => {
          // Add to local table to show immediate feedback
          // (Assuming the API returns the created object with an ID)
          //this.notes.push(response); 
          
          // Reset the form
          //this.noteForm.reset();
          window.location.reload();
        },
        error: (err) => {
          console.error('Error creating note:', err);
          alert('Failed to save note.');
        }
      });
    }
  }

  deleteNote(id: number | undefined) {
    if(!id) return;
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
       //this.notes = this.notes.filter(n => n.id !== id);
      console.debug('delete..');
    });
  }

}
