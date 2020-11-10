import {Component, OnInit} from '@angular/core';

import {DataTable} from 'simple-datatables';
import {ActivatedRoute, Router} from '@angular/router';

import {SubscriberService} from '../../../../../services/subscriber.service';

@Component({
  selector: 'app-subscriber-profile-component',
  templateUrl: './subscriberProfile.component.html',
  styleUrls: ['./subscriberProfile.component.scss']
})

export class SubscriberProfileComponent implements OnInit {
  measurements: any;
  currentSubscriber = null;
  measurementsDataTable: any;

  constructor(private router: Router,
              private subscriberService: SubscriberService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.retrieveSubById(this.route.snapshot.paramMap.get('id'));
  }

  retrieveSubById(id): void {
    this.subscriberService.get(id)
      .subscribe(
        data => {
          this.currentSubscriber = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
