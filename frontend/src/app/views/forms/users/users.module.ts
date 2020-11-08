import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {NewUserComponent} from "./new-user/new-user.component";
import {ListUserComponent} from "./list/list-user/list-user.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list-user',
        pathMatch: 'full'
    },
    {
        path: 'new-user',
        component: NewUserComponent
    },
    {
        path: 'list-user',
        component: ListUserComponent
    },
]

@NgModule({
  declarations: [NewUserComponent,ListUserComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule
    ]
})
export class UsersModule { }
