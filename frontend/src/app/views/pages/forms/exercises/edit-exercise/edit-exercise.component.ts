import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExerciseService} from '../../../../../services/exercise.service';
import Swal from "sweetalert2";
import {ExerciseTypeService} from "../../../../../services/exercise-type.service";
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {

     currentExercise = null;
    exerciseTypes: any;

    iframe_html: any;
    videoOptions = {
        query: {portrait: 0, color: '333'},
        attr: {width: 600, height: 475}
    };

    constructor(private exerciseService: ExerciseService,private exerciseTypeService: ExerciseTypeService,
                private activatedRoute: ActivatedRoute, private router: Router, private embedService: EmbedVideoService) {}

  ngOnInit(): void {
      this.getExercise(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getExercise(id): void {
    this.exerciseService.get(id)
      .subscribe(
        data => {
          this.currentExercise = data;
          this.iframe_html = this.embedService.embed(this.currentExercise.videoPath, this.videoOptions);
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

    showDeleteConfirmation(id) : void {
        // @ts-ignore
        Swal.fire({
            title: '¿Desea eliminar el usuario?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText:'',
        }).then((result) => {
            if (result.isConfirmed) {
                this.deleteExercise(id);
            }
        })
    }
}
