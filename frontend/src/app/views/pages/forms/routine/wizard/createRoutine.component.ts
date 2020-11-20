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
import {UserManagementDeleteDialogComponent} from "../../../../../../../../src/main/webapp/app/admin/user-management/user-management-delete-dialog.component";
import {SingleRoutineComponent} from "./single-routine/single-routine.component";

@Component({
  selector: 'app-create-routine',
  templateUrl: './createRoutine.component.html',
  styleUrls: ['./createRoutine.component.scss']
})
export class CreateRoutineComponent implements OnInit {

  subscriberId = 24;
  selectedPlan = 13;
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

  getRoutines(){
    this.routineService.getByPlan(this.selectedPlan)
        .subscribe(
            response => {
              this.routines = response;
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
  routineOut(): void {
    console.log("routineOut");
  }

  openRoutineModal(content) {
      const modalRef = this.modalService.open(SingleRoutineComponent, {centered: true, size: 'md'});

      modalRef.componentInstance.planId = this.selectedPlan;
      modalRef.componentInstance.eventOut.subscribe(()=>{
         this.getRoutines();
         console.log('getRoutines');
      });
  }
}
