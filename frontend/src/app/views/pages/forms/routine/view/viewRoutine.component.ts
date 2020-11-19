import {Component, ElementRef, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import {DataTable} from 'simple-datatables';
import {ActivatedRoute, Router} from '@angular/router';

import {SubscriberService} from '../../../../../services/subscriber.service';
import {CropperComponent} from 'angular-cropperjs';
import {UserService} from '../../../../../services/user.service';
import {FitUserService} from '../../../../../services/fit-user.service';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';
import {RoutineService} from "../../../../../services/routine.service";
import {ExercisesSetService} from "../../../../../services/exercisesSet.service";
import {ExercisesSetTypeService} from "../../../../../services/exercisesSetType.service";
import {ExerciseService} from "../../../../../services/exercise.service";
import {any} from "codelyzer/util/function";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-view-routine-component',
  templateUrl: './viewRoutine.component.html',
  styleUrls: ['./viewRoutine.component.scss']
})

export class ViewRoutineComponent implements OnInit {
  measurements: any;
  exercisesSets = [];
  exercisesSetsEliminados = [];
  currentRoutine = null;
  dataTable = DataTable;
  ids = [];
  sets = any;
  tipos = [];
  ejercicios = any;
  idsNuevos = 0;
  public exerciseIdToWatch: number;


  myStyle = {}

  frecuencias = [
    'Diaria', '2 días por semana', '3 días por semana', '4 días por semana'
  ];

  constructor(private modalService: NgbModal,
              private exerciseService: ExerciseService,
              private router: Router,
              private routineService: RoutineService,
              private exercisesSetService: ExercisesSetService,
              private exercisesSetTypeService: ExercisesSetTypeService,
              private subscriberService: SubscriberService,
              private userService: UserService,
              private fitUserService: FitUserService,
              private route: ActivatedRoute,
              private elRef: ElementRef) {
  }

  ngOnInit(): void {
    this.retrieveRoutineById(this.route.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit() {
    // this.sets = this.currentRoutine.exercisesSets;
    // this.exercisesSetTypeService.getAll().subscribe(
    //     tiposSet => {
    //         this.tipos = tiposSet;
    //         this.cargarTabla();
    //     }
    // )

  }


  retrieveRoutineById(id): void {
    this.routineService.get(id)
      .subscribe(
        data => {
          this.sets = data.exercisesSets;
          this.exerciseIdToWatch = this.sets[0].exercises[0].id;
          for (const set of data.exercisesSets) {
            set.exercisesSetTypes = null;
          }
          this.currentRoutine = data;
        },
        error => {
          console.log(error);
        });
  }

  updateRoutine(f) {
    if (f.valid) {
      const dataRoutineUpdate = {
        id: this.currentRoutine.id,
        name: this.currentRoutine.name,
        freq: this.currentRoutine.freq,
        exercisesSets: this.sets,

      };
      this.routineService.updateOnly(0, dataRoutineUpdate).subscribe(
        nuevaRutina => {
          console.log(nuevaRutina);
          if (this.exercisesSets.length > 0) {
            for (const set of this.exercisesSets) {
              let miSet = set;
              miSet.routine = {id: nuevaRutina.id}
              miSet.type = set.exercisesSetTypes.id;
              miSet.id = null;
              miSet.exercisesSetTypes = [];

              this.exercisesSetService.create(miSet).subscribe(
                nuevoSet => {
                  console.log(nuevoSet);
                  Swal.fire(
                    {
                      position: 'top-right',
                      showConfirmButton: false,
                      timer: 1500,
                      icon: 'success',
                      title: 'Rutina Actualizada.'
                    }
                  ).then(result => {
                    this.retrieveRoutineById(this.route.snapshot.paramMap.get('id'));
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
              for (const setEliminado of this.exercisesSetsEliminados) {
                setEliminado.routine = null;
                this.exercisesSetService.updateOnly(0, setEliminado).subscribe(
                  elminado => {
                    this.routineService.updateOnly(0, nuevaRutina).subscribe(

                    );
                  }
                )
              }
            }
          } else {
            for (const setEliminado of this.exercisesSetsEliminados) {
              setEliminado.routine = null;
              this.exercisesSetService.updateOnly(0, setEliminado).subscribe(
                elminado => {
                  this.routineService.updateOnly(0, nuevaRutina).subscribe();
                }
              )
            }
            Swal.fire(
              {
                position: 'top-right',
                showConfirmButton: false,
                timer: 1500,
                icon: 'success',
                title: 'Rutina Actualizada.'
              }
            ).then(result => {
              this.retrieveRoutineById(this.route.snapshot.paramMap.get('id'));
            })
          }

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
    } else {
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

  deleteRoutine(f) {
    Swal.fire(
      {
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning',
        title: '¿Desea eliminar rutina?'
      }
    ).then(result => {
      this.routineService.delete(this.currentRoutine.id).subscribe(
        response => {
          if (result.isConfirmed) {
            Swal.fire(
              'Eliminado!',
              'Se elimino la rutina.',
              'info'
            ).then(result => {
              this.router.navigateByUrl('routines');
            })
          }
        },
        error => {
        }
      )
    })
  }

  eliminar(rowIndex, rowData): void {
    let setEliminado = this.dataTable.rows().remove(rowIndex);
    //this.exercisesSetsEliminados.push(this.currentRoutine.exercisesSets.splice(rowData,1)[0]);
    this.exercisesSetsEliminados.push(this.currentRoutine.exercisesSets.find(function (element) {
      return element.id == rowData.id;
    }));

    this.funcionEliminar();
  };


  funcionEliminar() {
    for (const id of this.ids) {
      let row = this.dataTable.data.find(function (element) {
        return element.id == id;
      });
      if (row != null) {
        this.elRef.nativeElement.querySelector("#btn" + id).addEventListener("click", () => {
          this.eliminar(this.dataTable.data.find(function (element) {
            return element.id == id;
          }).dataIndex, this.dataTable.data.find(function (element) {
            return element.id == id;
          }));
        });
      }

    }

  }


  cargarTabla() {


    const dataTableRows = [];
    for (const set of this.currentRoutine.exercisesSets) {

      if (set != null) {
        let nombreEjercicios = '<ul> ';
        for (const ejercicio of set.exercises) {
          nombreEjercicios += '<li>' + ejercicio.name + '</li>';
        }
        let nombreTipo = this.tipos.find(function (element) {
          return element.id == set.type;
        }).typeName;
        nombreEjercicios += '</ul>'
        this.ids.push(set.id);
        dataTableRows.push([
          nombreTipo,
          set.restTime.toString(),
          nombreEjercicios,
          `<a  class=""  id="btn${set.id}" name="${set.id}">Eliminar</a>`,
        ]);


        console.log(set);
      }

    }
    // for (const id of ids) {
    //     for (const newRow of dataTableRows) {
    for (let i = 0; i < dataTableRows.length; i++) {

      //this.dataTable.rows().remove('all');
      this.dataTable.rows().add(dataTableRows[i]);
      this.dataTable.data[this.dataTable.data.length - 1].id = this.ids[i];
      // let row =this.dataTable.data[this.dataTable.data.length - 1];


    }
    this.funcionEliminar();

    // }


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

  funcionEjemploOut($event): void {
    console.log("TABLE");
    this.exercisesSets.push($event);


    console.log(this.elRef.nativeElement.querySelector('#exercisesSetDataTable'));
    $event.id = "nuevo" + this.idsNuevos;
    this.idsNuevos++;
    this.agregarSet($event);
  }

  agregarSet(row) {
    const dataTableRows = [];
    this.ids.push(row.id);
    if (row != null) {
      let nombreEjercicios = '<ul> ';
      for (const ejercicio of row.exercises) {
        nombreEjercicios += '<li>' + ejercicio.name + '</li>';
      }
      nombreEjercicios += '</ul>'

      dataTableRows.push([
        row.exercisesSetTypes.typeName,
        row.restTime,
        nombreEjercicios,
        `<a  class=""  id="btn${row.id}" name="${row.id}">Eliminar</a>`,
      ]);

      console.log(row);
    }


    if (dataTableRows.length > 0) {
      this.dataTable.rows().add(dataTableRows);
      this.dataTable.data[this.dataTable.data.length - 1].id = row.id;
    }

    this.funcionEliminar();
  }


  public setExerciseIdToWatch(id) {
    this.exerciseIdToWatch = id;
  }


}
