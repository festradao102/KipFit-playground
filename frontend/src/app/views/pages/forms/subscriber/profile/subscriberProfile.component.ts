import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {formatDate} from '@angular/common';
import {FitUserService} from '../../../../../services/fit-user.service';

@Component({
  selector: 'app-subscriber-profile-component',
  templateUrl: './subscriberProfile.component.html',
  styleUrls: ['./subscriberProfile.component.scss']
})

export class SubscriberProfileComponent implements OnInit {
  currentSubscriber = null;
  currentFitSubscriber = null;
  measurementsDataTable: any;
  measurements: any;

  constructor(private router: Router,
              private fitUserService: FitUserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.retrieveSubById(this.route.snapshot.paramMap.get('id'));
  }

  retrieveSubById(id): void {
    this.fitUserService.get(id)
      .subscribe(
        data => {
          console.log(data);
          this.currentFitSubscriber = data;
          this.currentFitSubscriber.bday = formatDate(data.bday, 'yyyy-MM-dd', 'en');
        },
        error => {
          console.log(error);
        });
  }
}
