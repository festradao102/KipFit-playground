import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataTable} from 'simple-datatables';
import {FitUserService} from "../../../../services/fit-user.service";

@Component({
  selector: 'app-plan-data-table-component',
  templateUrl: './planDataTable.component.html',
  styleUrls: ['./planDataTable.component.scss']
})

export class PlanDataTableComponent implements OnInit {
    plans: any;
    plansDataTable: any;

    constructor(private router: Router,
                private fitUserService:FitUserService,
                private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.plansDataTable = new DataTable('#plansDataTable');
        this.retrievePlansSubById(this.route.snapshot.paramMap.get('id'));
    }

    retrievePlansSubById(id): void {
        this.fitUserService.get(id)
            .subscribe(
                data => {
                    console.log(data);
                    const dataTableRows = [];
                    for (const singlePlan of data.subscriber.plans) {
                        dataTableRows.push([
                            singlePlan.objective,
                            singlePlan.dateCreated,
                            singlePlan.creatorName,
                            `<a href="/plans/${singlePlan.id}">Ver Detalle</a>`
                        ]);
                    }
                    console.log(dataTableRows);
                    this.plansDataTable.rows().add(dataTableRows);
                },
                error => {
                    console.log(error);
                });
    }
}

