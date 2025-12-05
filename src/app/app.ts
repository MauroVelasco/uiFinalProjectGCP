import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesList } from './notes-list/notes-list';
import { NewNote } from './new-note/new-note';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NotesList,NewNote],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('notes-app');
}
