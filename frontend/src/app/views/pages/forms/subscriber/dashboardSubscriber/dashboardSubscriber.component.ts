import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FitUserService} from '../../../../../services/fit-user.service';
import {formatDate} from '@angular/common';
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboardSubscriber.component.html',
  styleUrls: ['./dashboardSubscriber.component.scss'],
  preserveWhitespaces: true
})
export class DashboardSubscriberComponent implements OnInit {
  currentFitSubscriber = null;
    constructor(private router: Router,
              private fitUserService: FitUserService,
              private route: ActivatedRoute) {
  }
  images = ['assets/images/carousel1.jpg', 'assets/images/carousel2.jpg', 'assets/images/carousel3.jpg'];

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
                if(idList.length === 0){
                    Swal.fire(
                        {
                            icon: 'warning',
                            title: 'Aún no tienes un plan asignado, consulta a tu entrenador.'
                        }
                    )
                }
              else if(idList.length === 1){
                this.router.navigate(['/plans/' + idList]);
              }else{
                // tslint:disable-next-line:only-arrow-functions
                const idLastPlan = Math.max.apply(Math, idList.map(function(o) { return o; }))
                this.router.navigate(['/view-plan/' + idLastPlan]);
              }
            },
            error => {
              console.log(error);
            });
  }

    retrieveMeasurementSubscriberById(id): void {
        this.fitUserService.get(id)
            .subscribe(
                data => {
                    console.log(data);
                    const idList = [];
                    for (const measurement of data.subscriber.measurements) {
                        idList.push([
                            measurement.id
                        ]);

                    }
                    console.log(idList);
                    // tslint:disable-next-line:only-arrow-functions
                    // @ts-ignore
                    if(idList.length === 0){
                        Swal.fire(
                            {
                                icon: 'warning',
                                title: 'Aún no tienes mediciones registradas, consulta a tu entrenador.'
                            }
                        )
                    }
                    else if(idList.length === 1){
                        this.router.navigate(['/measurements/' + idList]);
                    }else {
                        // tslint:disable-next-line:only-arrow-functions
                        const idLastMeasurements = Math.max.apply(Math, idList.map(function(o) { return o; }))
                        this.router.navigate(['/measurements/' + idLastMeasurements]);
                    }
                },
                error => {
                    console.log(error);
                });
    }
}
