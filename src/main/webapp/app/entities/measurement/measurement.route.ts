import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMeasurement, Measurement } from 'app/shared/model/measurement.model';
import { MeasurementService } from './measurement.service';
import { MeasurementComponent } from './measurement.component';
import { MeasurementDetailComponent } from './measurement-detail.component';
import { MeasurementUpdateComponent } from './measurement-update.component';

@Injectable({ providedIn: 'root' })
export class MeasurementResolve implements Resolve<IMeasurement> {
  constructor(private service: MeasurementService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMeasurement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((measurement: HttpResponse<Measurement>) => {
          if (measurement.body) {
            return of(measurement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Measurement());
  }
}

export const measurementRoute: Routes = [
  {
    path: '',
    component: MeasurementComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.measurement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MeasurementDetailComponent,
    resolve: {
      measurement: MeasurementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.measurement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MeasurementUpdateComponent,
    resolve: {
      measurement: MeasurementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.measurement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MeasurementUpdateComponent,
    resolve: {
      measurement: MeasurementResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.measurement.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
