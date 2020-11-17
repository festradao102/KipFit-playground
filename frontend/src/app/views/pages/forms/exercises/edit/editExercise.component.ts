import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExerciseService} from '../../../../../services/exercise.service';
import Swal from 'sweetalert2';
import {ExerciseTypeService} from '../../../../../services/exercise-type.service';

@Component({
    selector: 'app-edit-exercise-component',
    templateUrl: './editExercise.component.html',
    styleUrls: ['./editExercise.component.scss']
})
export class EditExerciseComponent implements OnInit {

    currentExercise = null;
    exerciseTypes: any;

    constructor(private exerciseService: ExerciseService,
                private exerciseTypeService: ExerciseTypeService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getExercise(this.activatedRoute.snapshot.paramMap.get('id'));
        this.getAllExerciseTypes();
    }

    goBack() {
        this.getAllExerciseTypes();
    }

    getExercise(id): void {
        this.exerciseService.get(id)
            .subscribe(
                data => {
                    this.currentExercise = data;
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

    updateExercise(): void {
        this.exerciseService.update(this.currentExercise.id, this.currentExercise)
            .subscribe(
                response => {
                    console.log(response);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Ejercicio registrado satisfactoriamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.router.navigate(['exercises']);
                },
                error => {
                    console.log(error);
                });


    }

    deleteExercise(id): void {
        {
            this.exerciseService.delete(id)
                .subscribe(response => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Ejercicio eliminado satisfactoriamente',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        console.log(response);
                        this.router.navigate(['exercises']);
                    },
                    error => {
                        console.log(error);
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Code:' + error.status + '| Detail:' + error.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
        }
    }

    showDeleteConfirmation(id): void {
        // @ts-ignore
        Swal.fire({
            title: '¿Desea eliminar el usuario?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: '',
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteExercise(id);
            }
        })
    }

}
