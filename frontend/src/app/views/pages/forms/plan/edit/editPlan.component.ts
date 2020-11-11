import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanService} from '../../../../../services/plan.service';


@Component({
  selector: 'app-edit-plan-component',
  templateUrl: './editPlan.component.html',
  styleUrls: ['./editPlan.component.scss']
})
export class EditPlanComponent implements OnInit {
  subscribers: any;
  currentPlan = null;
  message = '';
  constructor(
    private planService: PlanService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit(): void {
    this.message = '';
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
    this.planService.update(this.currentPlan.id, this.currentPlan)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'El plan fue actualizado';
        },
        error => {
          console.log(error);
        });
  }

  deletePlan(): void {
   // const subId = this.currentPlan.subscriber.id;
    this.planService.delete(this.currentPlan.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/dashboard/']);
        },
        error => {
          console.log(error);
        });
  }
}
