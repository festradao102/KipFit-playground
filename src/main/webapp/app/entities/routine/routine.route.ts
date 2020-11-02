import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRoutine, Routine } from 'app/shared/model/routine.model';
import { RoutineService } from './routine.service';
import { RoutineComponent } from './routine.component';
import { RoutineDetailComponent } from './routine-detail.component';
import { RoutineUpdateComponent } from './routine-update.component';

@Injectable({ providedIn: 'root' })
export class RoutineResolve implements Resolve<IRoutine> {
  constructor(private service: RoutineService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRoutine> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((routine: HttpResponse<Routine>) => {
          if (routine.body) {
            return of(routine.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Routine());
  }
}

export const routineRoute: Routes = [
  {
    path: '',
    component: RoutineComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.routine.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RoutineDetailComponent,
    resolve: {
      routine: RoutineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.routine.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RoutineUpdateComponent,
    resolve: {
      routine: RoutineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.routine.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RoutineUpdateComponent,
    resolve: {
      routine: RoutineResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.routine.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
