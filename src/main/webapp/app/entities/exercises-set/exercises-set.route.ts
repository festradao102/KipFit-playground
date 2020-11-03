import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExercisesSet, ExercisesSet } from 'app/shared/model/exercises-set.model';
import { ExercisesSetService } from './exercises-set.service';
import { ExercisesSetComponent } from './exercises-set.component';
import { ExercisesSetDetailComponent } from './exercises-set-detail.component';
import { ExercisesSetUpdateComponent } from './exercises-set-update.component';

@Injectable({ providedIn: 'root' })
export class ExercisesSetResolve implements Resolve<IExercisesSet> {
  constructor(private service: ExercisesSetService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExercisesSet> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((exercisesSet: HttpResponse<ExercisesSet>) => {
          if (exercisesSet.body) {
            return of(exercisesSet.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ExercisesSet());
  }
}

export const exercisesSetRoute: Routes = [
  {
    path: '',
    component: ExercisesSetComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.exercisesSet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExercisesSetDetailComponent,
    resolve: {
      exercisesSet: ExercisesSetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.exercisesSet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExercisesSetUpdateComponent,
    resolve: {
      exercisesSet: ExercisesSetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.exercisesSet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExercisesSetUpdateComponent,
    resolve: {
      exercisesSet: ExercisesSetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.exercisesSet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
