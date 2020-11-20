import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataTable} from 'simple-datatables';
import {RoutineService} from '../../../../services/routine.service';

@Component({
    selector: 'app-routines-plan-data-table-component',
    templateUrl: './routinesPlanDataTable.component.html',
    styleUrls: ['./routinesPlanDataTable.component.scss']
})

export class RoutinesPlanDataTableComponent implements OnInit {
    routinesPlanDataTable = DataTable;
    urlSegment: any;

    constructor(private router: Router,
                private routineService: RoutineService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.routinesPlanDataTable = new DataTable('#routinesPlanDataTable');
       // this.retrieveRoutinesPlanByIdView(this.route.snapshot.paramMap.get('id'));
        // this.href = this.router.;
        // console.log(this.router.url);
        // console.log(this.route.snapshot.firstChild.url[0].path);
        this.checkUrlSegment(this.route.snapshot.pathFromRoot.map(o => o.url[0]).join(''));
    }

    checkUrlSegment(urlSegment): void {
        const editVariable = 'plans';
        const viewVariable = 'view-plan';
        if (urlSegment === editVariable) {
            this.retrieveRoutinesPlanByIdEdit(this.route.snapshot.paramMap.get('id'));
        } else if (urlSegment === viewVariable) {
            this.retrieveRoutinesPlanByIdView(this.route.snapshot.paramMap.get('id'));
        }
    }

    retrieveRoutinesPlanByIdView(id): void {
        var idString = id;
        var idInt: number = +idString;
        this.routineService.getAll()
            .subscribe(
                data => {
                    console.log(data);
                    const dataTableRows = [];
                    for (const routine of data) {
                        if (routine != null) {
                            if (routine.plan != null) {
                                if (routine.plan.id === idInt) {
                                    dataTableRows.push([
                                        routine.name,
                                        `<a href="/view-routines/${routine.id}">Ver Detalle</a>`
                                    ]);
                                }
                            }

                        }
                    }
                    console.log(dataTableRows);
                    this.routinesPlanDataTable.rows().add(dataTableRows);
                },
                error => {
                    console.log(error);
                });
    }

    retrieveRoutinesPlanByIdEdit(id): void {
        var idString = id;
        var idInt: number = +idString;
        this.routineService.getAll()
            .subscribe(
                data => {
                    console.log(data);
                    const dataTableRows = [];
                    for (const routine of data) {
                        if (routine != null) {
                            if (routine.plan != null) {
                                if (routine.plan.id === idInt) {
                                    dataTableRows.push([
                                        routine.name,
                                        `<a href="/routines/${routine.id}">Ver Detalle</a>`
                                    ]);
                                }
                            }

                        }
                    }
                    console.log(dataTableRows);
                    this.routinesPlanDataTable.rows().add(dataTableRows);
                },
                error => {
                    console.log(error);
                });
    }
}

