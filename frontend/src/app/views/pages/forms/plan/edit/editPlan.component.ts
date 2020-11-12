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
    this.planService.update(this.currentPlan)
      .subscribe(
        response => {
          console.log(response);
         // this.message = 'El plan fue actualizado';
            Swal.fire({
                //  position: 'top-end',
                icon: 'success',
                title: 'Plan actualizado satisfactoriamente',
                showConfirmButton: false,
                timer: 1500
            }).then (result => {
                this.router.navigateByUrl('dashboard');
            })
        },
        error => {
          console.log(error);
        });
  }

  deletePlan(): void {
    const subscriberId = this.currentPlan.subscriber.id;
    this.planService.delete(this.currentPlan.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/subscriber-profile/'+subscriberId]);
        },
        error => {
          console.log(error);
        });
  }
}
