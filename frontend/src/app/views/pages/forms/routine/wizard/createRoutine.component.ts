import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WizardComponent as BaseWizardComponent} from "angular-archwizard/lib/components/wizard.component";
import {PlanService} from "../../../../../services/plan.service";
import Swal from "sweetalert2";
import {RoutineService} from "../../../../../services/routine.service";
import {ExercisesSetService} from "../../../../../services/exercisesSet.service";
import {ExerciseService} from "../../../../../services/exercise.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ExercisesSetTypeService} from "../../../../../services/exercisesSetType.service";
import {any} from "codelyzer/util/function";

@Component({
  selector: 'app-create-routine',
  templateUrl: './createRoutine.component.html',
  styleUrls: ['./createRoutine.component.scss']
})
export class CreateRoutineComponent implements OnInit {

  subscriberId = 24;
  plans: any;
  routines: any;
  routine = {
    name: "",
    freq: "",
    exercisesSets: any,
    plan: any
  };
  frequencies = [
    'Diaria', '2 dias por semana', '3 dias por semana'
  ];

  constructor(public formBuilder: FormBuilder, public planService: PlanService,
              public routineService: RoutineService,
              public exercisesSetService: ExercisesSetService,
              public exercisesSetTypeService: ExercisesSetTypeService,
              public exerciseService: ExerciseService,
              public exercisesSet: ExercisesSetService,
              public modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans(){
    this.planService.getByUser(this.subscriberId)
        .subscribe(
            response => {
              this.plans = response;
              console.log(response);
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

  //Routine events
  routineOut($event): void {
    console.log("routineOut");
  }

  openRoutineModal(content) {
    /*this.exerciseService.getAll().subscribe(
        exercises => {
          // this.sets.ejercicios = exercises;
          this.ejercicios = exercises;
        }
    )*/
      this.modalService.open(content, {centered: true, size: 'md'}).result.then((result) => {
      console.log("Modal closed" + result);
      }).catch((res) => {
    });
  }
}
