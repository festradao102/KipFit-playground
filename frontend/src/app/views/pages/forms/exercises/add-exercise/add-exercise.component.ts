import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import {ExerciseService} from '../../../../../services/exercise.service';
import {ExerciseTypeService} from '../../../../../services/exercise-type.service';
import Swal from "sweetalert2";
import {any} from "codelyzer/util/function";


@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss']
})
export class AddExerciseComponent implements OnInit {

    exercises: any;
    exerciseTypes: any;
    currentEmployee = null;
    exercise = {
        id: '',
        name: '',
        position: '',
        instructions: '',
        videoPath: '',
        exerciseType : any
    };

    /*
  exerciseTypes =  {
          typeName: '',
          exercise: ''
      };





{
  "exerciseTypes": [
    {
      "id": 0,
      "typeName": "SUPERIOR"
    }
  ],
  "id": 0,
  "instructions": "string",
  "name": "string",
  "position": "string",
  "videoPath": "string"
}
   */

    submitted = false;

    constructor(private exerciseService: ExerciseService, private exerciseTypeService: ExerciseTypeService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllExercises();
        this.getAllExerciseTypes();
    }

    getAllExercises(): void {
        this.exerciseService.getAll()
            .subscribe(
                data => {
                    this.exercises = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });
    }


    getAllExerciseTypes(): void {
        this.exerciseTypeService.getAll()
            .subscribe(
                data => {
                    this.exerciseTypes = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });
    }

    saveExercise(): void {
        const data = {
            name: this.exercise.name,
            position: this.exercise.position,
            instructions: this.exercise.instructions,
            videoPath: this.exercise.videoPath,
            exerciseType: any
        };
        this.exerciseService.create(data)
            .subscribe(
                response => {
                    console.log(response);
                    this.submitted = true;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Ejercicio registrado satisfactoriamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    //this.getAllExercises();
                    this.ngOnInit();
                    this.router.navigate(['exercises']);
                },
                error => {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Code: ' + error.status,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log(error);
                });
    }

/*
        saveExerciseType():void {
            const data = {
                exerciseTypes: this.exerciseTypes
            };
            this.exerciseService.create(data)
                .subscribe(
                    response => {
                        console.log(response);
                        this.submitted = true;
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Ejercicio actualizado satisfactoriamente',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.router.navigate(['exercises/listExercises']);
                    },
                    error => {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Code: ' + error.status,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        console.log(error);
                    });

        }

 */

    }


