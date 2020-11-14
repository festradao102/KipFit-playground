import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlanService} from '../../../../../services/plan.service';
import {formatDate} from '@angular/common';
import {SubscriberService} from '../../../../../services/subscriber.service';
import {ObjectiveTypeService} from '../../../../../services/objectiveType.service';

@Component({
    selector: 'app-add-plan-component',
    templateUrl: './addPlan.component.html',
    styleUrls: ['./addPlan.component.scss']
})
export class AddPlanComponent implements OnInit {
  //  isUpdate = true;
    id: string;
    plan = {
        subscriber: {
            id: 0
        },
        objective: '',
        objectiveType: '',
        active: false,
        dateCreated: '',
        creatorName: 'system',
        routines: [],
    };
    subscribers: any;
    objectiveListSelected = [];
    objectives: any;
    submitted = false;
    constructor(private planService: PlanService,
                private subscriberService: SubscriberService,
                private objectiveTypeService: ObjectiveTypeService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.retrieveSubscribers();
        this.retrieveObjectiveTypes();
    }

    retrieveSubscribers(): void {
        this.subscriberService.getAll()
            .subscribe(
                data => {
                    this.subscribers = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });
    }

    retrieveObjectiveTypes(): void {
        this.objectiveTypeService.getAll()
            .subscribe(
                data => {
                    this.objectives = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });
    }
    savePlan(): void {
        const data = {
            subscriber: {
                id: this.plan.subscriber.id
            },
            objective: this.plan.objective,
            objectiveType: this.objectiveListSelected,
            active: this.plan.active,
            creatorName: 'system',
            routines: null,
            dateCreated: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en') + 'Z'
        };
        this.planService.create(data).subscribe(
            response => {
                console.log(response);
                this.submitted = true;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'El plan se creó correctamente',
                    showConfirmButton: false,
                    timer: 1500
                }).then (result => {
                    this.router.navigateByUrl('dashboard');
                })
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
}
