import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExerciseService} from '../../../../services/exercise.service';
import {DataTable} from 'simple-datatables';
import {single} from "rxjs/operators";
import Swal from "sweetalert2";
import {ExerciseTypeService} from "../../../../services/exercise-type.service";

@Component({
  selector: 'app-list-exercises-by-type-component',
  templateUrl: './exercisesFilterByTypeDataTable.component.html',
  styleUrls: ['./exercisesFilterByTypeDataTable.component.scss']
})
export class ExercisesFilterByTypeDataTableComponent implements OnInit {

    exercises: any;
    exercisesDataTable: any;
    typeName = '';

    constructor(private exerciseService: ExerciseService,
                private exerciseTypeService: ExerciseTypeService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.exercisesDataTable = new DataTable('#exercisesDataTable');
        this.getAllExercisesByType(this.activatedRoute.snapshot.paramMap.get('id'));
    }


  getAllExercisesByType(id): void {
        this.exerciseTypeService.get(id)
            .subscribe(
                data => {
                    console.log(data);
                    this.typeName = data.typeName;
                    this.exercises = data.exercise;
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
