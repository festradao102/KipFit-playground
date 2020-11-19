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

    constructor(private router: Router,
                private routineService: RoutineService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.routinesPlanDataTable = new DataTable('#routinesPlanDataTable');
        this.retrieveRoutinesPlanById(this.route.snapshot.paramMap.get('id'));
    }

    retrieveRoutinesPlanById(id): void {
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
}

