import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanService} from '../../../../../services/plan.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-edit-plan-component',
    templateUrl: './editPlan.component.html',
    styleUrls: ['./editPlan.component.scss']
})
export class EditPlanComponent implements OnInit {
    subscribers: any;
    currentPlan = null;

    // message = '';
    constructor(
        private planService: PlanService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        // this.message = '';
        this.getPlan(this.route.snapshot.paramMap.get('id'));
    }

    getPlan(id): void {
        this.planService.get(id)
            .subscribe(
                data => {
                    this.currentPlan = data;
                    console.log(data);
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
