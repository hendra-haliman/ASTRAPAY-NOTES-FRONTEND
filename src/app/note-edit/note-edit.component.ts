import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-edit',
  imports: [MatCardModule, MatFormField, MatInput, MatButton, ReactiveFormsModule, FormsModule, MatLabel, MatIconModule],
  templateUrl: './note-edit.component.html',
  styleUrl: './note-edit.component.css'
})

export class NoteEditComponent implements OnInit {
  id: number = 0;
  note: Note = new Note();

  constructor(private noteService: NotesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id') ? +this.route.snapshot.queryParamMap.get('id')! : 0;
    this.noteService.getNotesById(this.id).subscribe(
      (note: Note) => {
        this.note = note;
        console.log('Fetched Note:', this.note);
      },
      (error) => {
        console.error('Error fetching note:', error);
      }
    );
  }

  onSubmit(): void {
    console.log('Updating Note:', this.note);
    this.noteService.updateNote(this.note).subscribe(
      (response) => {
        console.log('Note Updated:', response);
        this.resetForm();
        this.router.navigate(['/list']); // Navigate to the list
      },
      (error) => {
        console.error('Error updating note:', error);
      }
    );
  }

  onCancel(): void {
    console.log('Edit cancelled');
    this.resetForm();
    this.router.navigate(['/list']);
  }

  resetForm(): void {
    this.note = new Note();
  }

}
