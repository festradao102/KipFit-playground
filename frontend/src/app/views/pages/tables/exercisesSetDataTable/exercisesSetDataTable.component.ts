import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {UserService} from '../../../../services/user.service';
import {FitUserService} from '../../../../services/fit-user.service';
import {DataTable} from 'simple-datatables';
import {any} from 'codelyzer/util/function';
import {formatDate} from '@angular/common';
import {RoutineService} from "../../../../services/routine.service";
import {ExercisesSetService} from "../../../../services/exercisesSet.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-exercises-set-table',
  templateUrl: './exercisesSetDataTable.component.html',
  styleUrls: ['./exercisesSetDataTable.component.scss']
})
export class ExercisesSetDataTableComponent implements OnInit {
    @Output() EventSendOut = new EventEmitter<DataTable>();

  exercisesSetTable = DataTable;

  constructor(private router: Router,private routineService: RoutineService, private exercisesSet: ExercisesSetService,private route: ActivatedRoute,private modalService: NgbModal) { }

  ngOnInit(): void {

    // this.exercisesSetTable = new DataTable('#exercisesSetDataTable',{searchable: false, header: true,sortable:false, paging:false});
    // this.routineService.get(this.route.snapshot.paramMap.get('id')).subscribe(
    //     rutina => {
    //
    //       const dataTableRows = [];
    //       for (const rutinaSet of rutina) {
    //           if(rutinaSet.exercisesSet!=null){
    //             // const estado = fitUser.user.activated = (true) ? 'Activo' : 'Inactivo';
    //             dataTableRows.push([
    //                 rutinaSet.exercisesSet.exercisesSetTypes,
    //                 rutinaSet.exercisesSet.restTime,
    //                 `<a href="/routine-profile/${rutinaSet.exercisesSet.id}">Editar</a>`
    //             ]);
    //           }
    //
    //       }
    //       console.log(dataTableRows);
    //
    //       this.exercisesSetTable.rows().add(dataTableRows);
    //       this.exercisesSetTable.destroy();
    //       this.EventSendOut.emit(new DataTable('#exercisesSetDataTable',{searchable: false, header: true,sortable:false, paging:false}));
    //     }
    // )

  }







}
