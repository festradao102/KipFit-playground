import { Component, OnInit } from '@angular/core';
import {formatDate} from "@angular/common";


import { SubscriberService } from '../../../../../services/subscriber.service';
import {MeasurementService} from "../../../../../services/measurement.service";

@Component({
  selector: 'app-add-measurement-component',
  templateUrl: './addMeasurement.component.html',
  styleUrls: ['./addMeasurement.component.scss']
})
export class AddMeasurementComponent implements OnInit {
  subscribers: any;
  currentSubscriber = null;
  message = '';
  measurement = {
    metabolicage: 0,
    bmr: 0,
    boneMass: 0,
    height: 0,
    weight: 0,
    fatPercentage: 0,
    neck: 0,
    rightArm: 0,
    leftArm: 0,
    wrist: 0,
    core: 0,
    hip: 0,
    thorax: 0,
    rightThigh: 0,
    leftThigh: 0,
    rightCalve: 0,
    leftCalve: 0,
    subscriber: {
      id: 0
    }
  };
  submitted = false;
  constructor(private measurementService: MeasurementService, private subscriberService: SubscriberService) { }

  ngOnInit(): void {
    this.message = '';
    this.retrieveSubscribers();
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

  saveMeasurement(): void {
    const data = {
      metabolicage: this.measurement.metabolicage,
      bmr: this.measurement.metabolicage,
      boneMass: this.measurement.boneMass,
      height: this.measurement.height,
      weight: this.measurement.weight,
      fatPercentage: this.measurement.fatPercentage,
      neck: this.measurement.neck,
      rightArm: this.measurement.rightArm,
      leftArm: this.measurement.leftArm,
      wrist: this.measurement.wrist,
      core: this.measurement.core,
      hip: this.measurement.hip,
      thorax: this.measurement.thorax,
      rightThigh: this.measurement.rightThigh,
      leftThigh: this.measurement.leftThigh,
      rightCalve: this.measurement.rightCalve,
      leftCalve: this.measurement.leftCalve,
      subscriber: {
        id: this.measurement.subscriber.id
      },
      dateCreated: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en')+'Z'
    };
    this.measurementService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
}
