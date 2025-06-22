import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Note } from '../note';
import { NotesService } from '../notes.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-list',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, HttpClientModule, MatIcon, NgIf],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'content', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Note>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private notesService: NotesService, private router: Router) {}

  ngOnInit(): void {
    this.notesService.getNotes().subscribe(notes=> {
      this.dataSource.data = notes;
      this.dataSource.paginator = this.paginator;
    })
  }

  onEdit(note: Note): void {
    this.router.navigate(['/edit'], { queryParams: { id: note.id } });
    console.log('Edit Note:', note);
  }

  onDelete(note: Note): void {
    this.notesService.deleteNote(note.id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(n => n.id !== note.id);
      console.log('Deleted Note:', note);
    }, error => {
      console.error('Error deleting note:', error);
    });
  }

}
