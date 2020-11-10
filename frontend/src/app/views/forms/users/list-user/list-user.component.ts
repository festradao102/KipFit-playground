import { Component, OnInit } from '@angular/core';
import {DataTable} from 'simple-datatables';
import {ActivatedRoute, Router} from "@angular/router";
import {FitUserService} from "../../../../../services/fit-user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: any;
  usersDataTable: any;

  constructor(private router: Router,
              private fitUserService: FitUserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.usersDataTable = new DataTable('#usersDataTable');
    this.getUsers();
  }

  getUsers(): void {
    this.fitUserService.getAll()
        .subscribe(
            data => {
              console.log(data);
              this.users = data;
              const dataTableRows = [];
              for (const user of this.users) {
                dataTableRows.push([
                  user.legalId.toString(),
                  user.user === null ? "" : user.user.firstName + " " + user.user.lastName,
                  `<a href="/users/new-user/${user.id}">Ver Detalles</a>`
                ]);
              }
              console.log(dataTableRows);
              this.usersDataTable.rows().add(dataTableRows);
            },
            error => {
              console.log(error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Code:' + error.status + '| Detail:' + error.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            });
  }
}
