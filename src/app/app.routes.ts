import { Routes } from '@angular/router';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteEditComponent } from './note-edit/note-edit.component';

export const routes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: NoteListComponent},
    {path: 'create', component: NoteCreateComponent},
    {path: 'edit', component: NoteEditComponent},
];


