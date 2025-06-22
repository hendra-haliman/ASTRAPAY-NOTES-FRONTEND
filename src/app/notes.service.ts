import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private baseUrl = 'http://localhost:8000/api/v1/notes';

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {  
    return this.http.get<Note[]>(`${this.baseUrl}`);
  }

  getNotesById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/${id}`); 
  }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}`, note);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/${note.id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
