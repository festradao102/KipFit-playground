import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExerciseService} from '../../../../services/exercise.service';
import {DataTable} from 'simple-datatables';
import {single} from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: 'app-exercises-data-table-component',
  templateUrl: './exercisesDataTable.component.html',
  styleUrls: ['./exercisesDataTable.component.scss']
})
export class ExercisesDataTableComponent implements OnInit {

    exercises: any;
    exercisesDataTable: any;


    constructor(private router: Router, private route: ActivatedRoute, private exerciseService: ExerciseService) {
    }

    ngOnInit(): void {
        this.exercisesDataTable = new DataTable('#exercisesDataTable');
        this.getAllExercises();
    }


    getAllExercises(): void {
        this.exerciseService.getAll()
            .subscribe(
                data => {
                    console.log(data);
                    this.exercises = data;
                    const dataTableRows = [];
                    for (const singleExercise of this.exercises) {
                        dataTableRows.push([
                            singleExercise.name,
                            `<a href="/exercises/${singleExercise.id}">Ver Detalles</a>`
                        ]);
                    }
                    console.log(dataTableRows);
                    this.exercisesDataTable.rows().add(dataTableRows);
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
