import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesList } from './notes-list/notes-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NotesList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('notes-app');
}
