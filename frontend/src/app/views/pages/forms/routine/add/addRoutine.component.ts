import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';

import {any} from 'codelyzer/util/function';
import {ActivatedRoute, Router} from '@angular/router';

import {RoutineService} from "../../../../../services/routine.service";
import {ExercisesSetService} from "../../../../../services/exercisesSet.service";
import {ExercisesSetTypeService} from "../../../../../services/exercisesSetType.service";
import {SubscriberDataTableComponent} from "../../../tables/subscriberDataTable/subscriberDataTable.component";
import {AddExercisesSetComponent} from "../../../forms/exercisesSet/add/addExercisesSet.component"
import {DataTable} from 'simple-datatables';
import {FormsModule} from "@angular/forms";
import {ExerciseService} from "../../../../../services/exercise.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";

@Component({
    selector: 'app-add-routine-component',
    templateUrl: './addRoutine.component.html',
    styleUrls: ['./addRoutine.component.scss']
})


export class AddRoutineComponent implements OnInit {
    @Output() eventOut = new EventEmitter<any>();

    routine = {
        name: "",
        freq: "",
        exercisesSets: any,
        plan: any
    };
    exercisesSets = [];
    ejercicios = any;
    frecuencias = [
        'Diaria', '2 días por semana', '3 días por semana', '4 días por semana'
    ];
    ejemploPapa: String = "papa";
    outpapa: "";

    dataTable = DataTable;
    miTabla = any;

    @ViewChild(AddExercisesSetComponent) addExercisesSetComponent;


    constructor(private exercisesSetService: ExercisesSetService ,private elRef: ElementRef, private exerciseService: ExerciseService, private modalService: NgbModal, private router: Router, private routineService: RoutineService, private exercisesSet: ExercisesSetService, private exercisesSetTypeService: ExercisesSetTypeService) {
    }

    ngOnInit(): void {
        this.dataTable = new DataTable('#exercisesSetDataTable', {
            searchable: false,
            header: true,
            sortable: false,
            paging: false
        });

    }

    cargarTabla($event): void {
        this.miTabla = $event;
    }

    funcionEjemploOut($event): void {
        console.log("TABLE");
        this.exercisesSets.push($event);


        console.log(this.elRef.nativeElement.querySelector('#exercisesSetDataTable'));
        this.actualizarTabla();
    }

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
                    for(const set of this.exercisesSets){
                        let miSet =set;
                        miSet.routine={id: nuevaRutina.id}
                        miSet.type= set.exercisesSetTypes.id;
                        miSet.exercisesSetTypes=[];

                        this.exercisesSetService.create(miSet).subscribe(
                            nuevoSet => {
                                //this.exercisesSetTypeService.create({typeName: set.exercisesSetType.typeName,exercisesSet:{id:set.id}})
                                console.log(nuevoSet);
                                Swal.fire(
                                    {

                                        icon: 'success',
                                        title: 'Rutina Agregada.'
                                    }
                                ).then(result => {
                                    this.router.navigateByUrl('routines');
                                })
                            },
                            error => {
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

    abrirListaSet(listaSets,f) {
        if(f.valid){
            listaSets.classList.remove('d-none')
            // this.actualizarTabla();
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

    abrirNuevoSet(content) {
        this.exerciseService.getAll().subscribe(
            exercises => {
                // this.sets.ejercicios = exercises;
                this.ejercicios = exercises;
            }
        )
        this.modalService.open(content, {centered: true, size: 'md'}).result.then((result) => {
            console.log("Modal closed" + result);
        }).catch((res) => {
        });
    }

    cerrarNuevoSet(content) {

        this.modalService.dismissAll();
    }

    actualizarTabla() {


        const dataTableRows = [];
        for (const set of this.exercisesSets) {
            if (set != null) {
                let nombreEjercicios = '<ul> ';
                for (const ejercicio of set.exercises) {
                    nombreEjercicios += '<li>' + ejercicio.name + '</li>';
                }
                nombreEjercicios += '</ul>'

                dataTableRows.push([
                    set.exercisesSetTypes.typeName,
                    set.restTime,
                    nombreEjercicios,
                    `<!--<a  onclick="eliminarFila: function (){  }">Eliminar</a>-->`
                ]);

                console.log(set);
            }

        }

        if (dataTableRows.length > 0) {
            this.dataTable.rows().remove('all');
            this.dataTable.rows().add(dataTableRows);
        }

        this.elRef.nativeElement.querySelector('#btnCrear').classList.remove('d-none')
        this.elRef.nativeElement.querySelector('#btnContinuar').classList.add('d-none')

    }

    eliminarFila(index) {
        this.dataTable.rows().remove(index);
    }


}
