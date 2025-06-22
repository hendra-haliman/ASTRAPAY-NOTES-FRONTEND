import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Note } from '../note';
import { NotesService } from '../notes.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-note-create',
    imports: [MatCardModule, MatFormField, MatInput, MatButton, ReactiveFormsModule, FormsModule, MatLabel, MatIconModule],
    templateUrl: './note-create.component.html',
    styleUrl: './note-create.component.css'
})

export class NoteCreateComponent implements OnInit {
    note: Note = new Note();

    constructor(private notesService: NotesService, private router: Router) { }

    ngOnInit(): void {

    }

    onSubmit(): void {
        console.log('Creating Note:', { title: this.note.title, content: this.note.content });

        this.notesService.createNote(this.note).subscribe(
            (response) => {
                console.log('Note Created:', { title: this.note.title, content: this.note.content });
                this.resetForm();
                this.router.navigate(['/list']); // Navigate to the list
            },
            (error) => {
                console.error('Error creating note:', error);
            }
        );
    }

    onCancel(): void {
        this.resetForm();
        this.router.navigate(['/list']);
    }

    resetForm(): void {
        this.note = new Note();
    }

}
