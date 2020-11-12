import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriberService} from '../../../../../services/subscriber.service';
import {DataTable} from 'simple-datatables';

@Component({
  selector: 'app-list-plan-component',
  templateUrl: './listPlan.component.html',
  styleUrls: ['./listPlan.component.scss']
})

export class ListPlanComponent implements OnInit {
    plans: any;
    plansDataTable: any;

    constructor(private router: Router,
                private subscriberService:SubscriberService,
                private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.plansDataTable = new DataTable('#plansDataTable');
        this.retrievePlansSubById(this.route.snapshot.paramMap.get('id'));
    }

    retrievePlansSubById(id): void {
        this.subscriberService.get(id)
            .subscribe(
                data => {
                    console.log(data);
                    const dataTableRows = [];
                    for (const singlePlan of data.plans) {
                        dataTableRows.push([
                            singlePlan.objective,
                            singlePlan.dateCreated,
                            singlePlan.creatorName,
                            `<a href="/plans/${singlePlan.id}">Ver Detalles</a>`
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

