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

    retrievePlansSubscriberById(id): void {
        this.fitUserService.get(id)
            .subscribe(
                data => {
                    console.log(data);
                    const idList = [];
                    for (const plan of data.subscriber.plans) {
                        idList.push([
                            plan.id
                        ]);

                    }
                    console.log(idList);
                    // tslint:disable-next-line:only-arrow-functions
                    // @ts-ignore
                    if(idList.length === 1){
                        this.router.navigate(['/plans/' + idList]);
                    }else{
                        // tslint:disable-next-line:only-arrow-functions
                        const idPlanReciente = Math.max.apply(Math, idList.map(function(o) { return o; }))
                        this.router.navigate(['/view-plan/' + idPlanReciente]);
                    }
                    },
                error => {
                    console.log(error);
                });
    }
}
