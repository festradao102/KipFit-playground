import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {any} from "codelyzer/util/function";
import {AddExercisesSetComponent} from "../../../exercisesSet/add/addExercisesSet.component";
import {RoutineService} from "../../../../../../services/routine.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-single-routine',
  templateUrl: './single-routine.component.html',
  styleUrls: ['./single-routine.component.scss']
})
export class SingleRoutineComponent implements OnInit {
  @Output() eventOut = new EventEmitter<any>();
  routine = {
    name: "",
    freq: "",
    exercisesSets: any,
    plan: any
  };
  frecuencias = ['Diaria', '2 días por semana', '3 días por semana', '4 días por semana'];

  constructor(private routineService: RoutineService) { }

  ngOnInit(): void {}

  saveRoutine(f): void {
    if(f.valid){
      const dataRoutine = {
        name: this.routine.name,
        freq: this.routine.freq,
        exercisesSets: [],
      };

      this.routineService.create(dataRoutine).subscribe(
          nuevaRutina => {
            console.log(nuevaRutina);
          },
          error =>{
            Swal.fire(
                {
                  icon: 'error',
                  title: "Error",
                  html: error.error.title
                }
            )
          }
      )
    }else{
      Swal.fire(
          {
            position: 'center',
            showConfirmButton: true,
            icon: 'warning',
            title: 'Validar campos requeridos.'
          }
      )
    }
  }
}
