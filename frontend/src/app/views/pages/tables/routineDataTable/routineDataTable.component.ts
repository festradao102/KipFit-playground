import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {UserService} from '../../../../services/user.service';
import {FitUserService} from '../../../../services/fit-user.service';
import {DataTable} from 'simple-datatables';
import {any} from 'codelyzer/util/function';
import {formatDate} from '@angular/common';
import {RoutineService} from "../../../../services/routine.service";

@Component({
  selector: 'app-routine-table',
  templateUrl: './routineDataTable.component.html',
  styleUrls: ['./routineDataTable.component.scss']
})
export class RoutineDataTableComponent implements OnInit {

  routineTable = DataTable;

  constructor(private router: Router,
              private userService: UserService,private routineService: RoutineService, private fitUserService: FitUserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routineTable = new DataTable('#routineDataTable');

    this.routineService.getAll().subscribe(
        data => {

          const dataTableRows = [];
          for (const routine of data) {
              if(routine!=null){
                  // let sets = '<ul> ';
                  // for (const set of routine.exercisesSets) {
                  //     sets += '<li>' + set.name + '</li>';
                  // }
                  // sets += '</ul>'
                dataTableRows.push([
                  routine.name,
                  routine.freq,
                  `<a href="/routines/${routine.id}">Ver Detalles</a>`
                ]);
              }

          }
          console.log(dataTableRows);

          this.routineTable.rows().add(dataTableRows);
        }
    )

  }




}
