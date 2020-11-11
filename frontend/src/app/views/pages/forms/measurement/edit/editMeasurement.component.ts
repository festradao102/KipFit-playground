import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MeasurementService} from '../../../../../services/measurement.service';

@Component({
  selector: 'app-edit-measurement-component',
  templateUrl: './editMeasurement.component.html',
  styleUrls: ['./editMeasurement.component.scss']
})
export class EditMeasurementComponent implements OnInit {
  subscribers: any;
  currentMeasurement = null;
  message = '';
  constructor(
    private measurementService: MeasurementService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit(): void {
    this.message = '';
    this.getMeasurement(this.route.snapshot.paramMap.get('id'));
  }

  getMeasurement(id): void {
    this.measurementService.get(id)
      .subscribe(
        data => {
          this.currentMeasurement = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateMeasurement(): void {
    this.measurementService.update(this.currentMeasurement)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'Las medidas fueron actualizadas';
        },
        error => {
          console.log(error);
        });
  }

  deleteMeasurement(): void {
    const subId = this.currentMeasurement.subscriber.id;
    this.measurementService.delete(this.currentMeasurement.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/subscriber-profile/'+subId]);
        },
        error => {
          console.log(error);
        });
  }
}
