import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {any} from "codelyzer/util/function";
import {AddExercisesSetComponent} from "../../../exercisesSet/add/addExercisesSet.component";
import {RoutineService} from "../../../../../../services/routine.service";
import Swal from "sweetalert2";
import {AddRoutineComponent} from "../../add/addRoutine.component";
import {CreateRoutineComponent} from "../createRoutine.component";
import {PlanService} from "../../../../../../services/plan.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-single-routine',
  templateUrl: './single-routine.component.html',
  styleUrls: ['./single-routine.component.scss']
})
export class SingleRoutineComponent implements OnInit {
  @Output() eventOut = new EventEmitter<any>();
  @Input() public planId: number;

  routine = {
    name: "",
    freq: "",
    exercisesSets: any,
    plan: null,
  };
  frequencies = ['Diaria', '2 días por semana', '3 días por semana', '4 días por semana'];

  constructor(private routineService: RoutineService, private planService: PlanService) { }

  ngOnInit(): void {
      console.log(this.planId);
  }

  saveRoutine(form): void {
    if(form.valid){
      const newRoutine = {
        name: this.routine.name,
        freq: this.routine.freq,
        plan: this.routine.plan,
        exercisesSets: [],
      };

      this.routineService.create(newRoutine).subscribe(
          newRoutine => {
            console.log(newRoutine);
            this.eventOut.emit();
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

  getPlan(): void {
      this.planService.get(this.planId).subscribe(
          result => {
              console.log(result);
              const data = {
                  objective: result.objective,
                  objectiveType: result.objectiveListSelected,
                  active: result.active,
                  creatorName: 'system',
                  routines: null,
                  dateCreated: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en') + 'Z'
              };
              this.routine.plan = data;
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
  }
}
