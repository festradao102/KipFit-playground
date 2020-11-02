import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExercisesSetType, ExercisesSetType } from 'app/shared/model/exercises-set-type.model';
import { ExercisesSetTypeService } from './exercises-set-type.service';
import { ExercisesSetTypeComponent } from './exercises-set-type.component';
import { ExercisesSetTypeDetailComponent } from './exercises-set-type-detail.component';
import { ExercisesSetTypeUpdateComponent } from './exercises-set-type-update.component';

@Injectable({ providedIn: 'root' })
export class ExercisesSetTypeResolve implements Resolve<IExercisesSetType> {
  constructor(private service: ExercisesSetTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExercisesSetType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((exercisesSetType: HttpResponse<ExercisesSetType>) => {
          if (exercisesSetType.body) {
            return of(exercisesSetType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ExercisesSetType());
  }
}

export const exercisesSetTypeRoute: Routes = [
  {
    path: '',
    component: ExercisesSetTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.exercisesSetType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExercisesSetTypeDetailComponent,
    resolve: {
      exercisesSetType: ExercisesSetTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.exercisesSetType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExercisesSetTypeUpdateComponent,
    resolve: {
      exercisesSetType: ExercisesSetTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.exercisesSetType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExercisesSetTypeUpdateComponent,
    resolve: {
      exercisesSetType: ExercisesSetTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.exercisesSetType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
