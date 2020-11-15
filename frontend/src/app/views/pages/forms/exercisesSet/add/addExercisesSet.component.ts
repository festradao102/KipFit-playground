import {Component, Input, NgModule, OnInit, Output, ViewChild,EventEmitter} from '@angular/core';

import {any} from 'codelyzer/util/function';
import {ActivatedRoute, Router} from '@angular/router';

import {ExercisesSetService} from "../../../../../services/exercisesSet.service";
import {ExercisesSetTypeService} from "../../../../../services/exercisesSetType.service";
import Swal from "sweetalert2";
import {ExerciseService} from "../../../../../services/exercise.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectComponent} from "../../../advanced-form-elements/ng-select/ng-select.component";
import {AddRoutineComponent} from "../../routine/add/addRoutine.component";





@Component({
    selector: 'app-add-exercisesSet-component',
    templateUrl: './addExercisesSet.component.html',
    styleUrls: ['./addExercisesSet.component.scss']
})

@NgModule({
    declarations: [
        NgSelectComponent
    ]
})


export class AddExercisesSetComponent implements OnInit {
@Input() ejemploChild: String;
@Output() EventSendOut = new EventEmitter<any>();

    exercisesSet = {
        restTime: 0,
        exercisesSetTypes: any,
        exercises: any,
        routine: any
    };

    // exercisesSetTypes ={
    //     id: 0,
    //     typeName: ""
    // };
    @Input() routine: AddRoutineComponent;

    stringOut = "hijo Out"
    tipos = any;
    ejercicios = any;
    ejerciciosElejidos = any;

    constructor(private router: Router, private exercisesSetService: ExercisesSetService, private exercisesSetType: ExercisesSetTypeService, private exerciseService: ExerciseService,private modalService: NgbModal) {}

    ngOnInit(): void {
        this.exercisesSetType.getAll().subscribe(
            tipos => {
                this.tipos= tipos
            }
        )
        this.exerciseService.getAll().subscribe(
            exercises => {
                this.ejercicios = exercises;
            }
        )

    }

    SendVariables(){
        this.EventSendOut.emit(this.exercisesSet);
    }


    saveExercisesSet(): void {
        console.log(this);
        this.SendVariables();
        this.modalService.dismissAll();

    }

    abrirNuevoSet(content) {
        this.exerciseService.getAll().subscribe(
            exercises => {
                this.ejercicios = exercises;
            }
        )
        this.modalService.open(content, {centered: true,size: 'l'}).result.then((result) => {
            console.log("Modal closed" + result);
        }).catch((res) => {});
    }
}
