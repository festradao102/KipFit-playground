import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanService} from '../../../../../services/plan.service';
import Swal from 'sweetalert2';
import {FitUserService} from '../../../../../services/fit-user.service';
import {of} from 'rxjs';
import {formatDate} from '@angular/common';


@Component({
    selector: 'app-view-plan-component',
    templateUrl: './viewPlan.component.html',
    styleUrls: ['./viewPlan.component.scss']
})
export class ViewPlanComponent implements OnInit {
    subscribers: any;
    currentPlan = null;
    subcriberName: any;
    formattedDate: any;
    fitUsers: any;
    idRoutine: any;
    constructor(
        private planService: PlanService,
        private fitUserService: FitUserService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        // this.message = '';
        this.getPlan(this.route.snapshot.paramMap.get('id'));
      //  this.showSubscriberName();
        this.getFitUsers();

    }

    showSubscriberName(): void {
        const fitUs = [];
        fitUs.push(this.getFitUsers()) ;
    }
    getFitUsers(): void {
        this.fitUserService.getAll()
            .subscribe(
                data => {
                    for(const fitU of data){
                        if(fitU.subscriber != null){
                            if(fitU.subscriber.id === this.currentPlan.subscriber.id){
                                this.subcriberName = fitU.user.firstName + ' ' + fitU.user.lastName;
                        }
                        }
                    }
                   // this.fitUsers = data;
                    console.log(data);
                    console.log(this.subcriberName);
                },
                error => {
                    console.log(error);
                });
    }

    getPlan(id): void {
        this.planService.get(id)
            .subscribe(
                data => {
                    this.currentPlan = data;
                    console.log(data);
                    this.formattedDate = formatDate(this.currentPlan.dateCreated, 'yyyy-MM-dd', 'en');
                    for(const routine of data.routines){
                        this.idRoutine = routine.id;
                    }
                    },
                error => {
                    console.log(error);
                });
    }

    updatePlan(): void {
        const subscriberId = this.currentPlan.subscriber.id;
        this.planService.update(this.currentPlan)
            .subscribe(
                response => {
                    console.log(response);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El plan se actualizó correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(result => {
                        this.router.navigate(['/subscriber-profile/' + subscriberId]);
                    })
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
    deletePlanConfirm(): void {
        const subscriberId = this.currentPlan.subscriber.id;
        this.planService.delete(this.currentPlan.id)
            .subscribe(
                response => {
                    console.log(response);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El plan se eliminó correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(result => {
                        this.router.navigate(['/subscriber-profile/' + subscriberId]);
                    })
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

    deletePlan(): void {
        Swal.fire({
                position: 'top-end',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                icon: 'warning',
                title: '¿Desea eliminar el plan?'
            }
        ).then(result => {
            if (result.isConfirmed) {
                this.deletePlanConfirm();
            }

        })
    }
}
