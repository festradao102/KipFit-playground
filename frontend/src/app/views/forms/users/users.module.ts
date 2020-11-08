import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {NewUserComponent} from "./new-user/new-user.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list-user',
        pathMatch: 'full'
    },
    {
        path: 'new-user/:id',
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
        FormsModule,
        NgxMaskModule,
        ReactiveFormsModule
    ]
})
export class UsersModule { }
