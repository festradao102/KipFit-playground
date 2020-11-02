import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGuidedTraining, GuidedTraining } from 'app/shared/model/guided-training.model';
import { GuidedTrainingService } from './guided-training.service';
import { GuidedTrainingComponent } from './guided-training.component';
import { GuidedTrainingDetailComponent } from './guided-training-detail.component';
import { GuidedTrainingUpdateComponent } from './guided-training-update.component';

@Injectable({ providedIn: 'root' })
export class GuidedTrainingResolve implements Resolve<IGuidedTraining> {
  constructor(private service: GuidedTrainingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGuidedTraining> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((guidedTraining: HttpResponse<GuidedTraining>) => {
          if (guidedTraining.body) {
            return of(guidedTraining.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GuidedTraining());
  }
}

export const guidedTrainingRoute: Routes = [
  {
    path: '',
    component: GuidedTrainingComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.guidedTraining.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GuidedTrainingDetailComponent,
    resolve: {
      guidedTraining: GuidedTrainingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.guidedTraining.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GuidedTrainingUpdateComponent,
    resolve: {
      guidedTraining: GuidedTrainingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.guidedTraining.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GuidedTrainingUpdateComponent,
    resolve: {
      guidedTraining: GuidedTrainingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.guidedTraining.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
