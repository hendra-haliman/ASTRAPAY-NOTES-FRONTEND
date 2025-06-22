import { Routes } from '@angular/router';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteListComponent } from './note-list/note-list.component';

export const routes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: NoteListComponent},
    {path: 'create', component: NoteCreateComponent},
];


