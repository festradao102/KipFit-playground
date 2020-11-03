import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExerciseType, ExerciseType } from 'app/shared/model/exercise-type.model';
import { ExerciseTypeService } from './exercise-type.service';
import { ExerciseTypeComponent } from './exercise-type.component';
import { ExerciseTypeDetailComponent } from './exercise-type-detail.component';
import { ExerciseTypeUpdateComponent } from './exercise-type-update.component';

@Injectable({ providedIn: 'root' })
export class ExerciseTypeResolve implements Resolve<IExerciseType> {
  constructor(private service: ExerciseTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExerciseType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((exerciseType: HttpResponse<ExerciseType>) => {
          if (exerciseType.body) {
            return of(exerciseType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ExerciseType());
  }
}

export const exerciseTypeRoute: Routes = [
  {
    path: '',
    component: ExerciseTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.exerciseType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExerciseTypeDetailComponent,
    resolve: {
      exerciseType: ExerciseTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.exerciseType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExerciseTypeUpdateComponent,
    resolve: {
      exerciseType: ExerciseTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.exerciseType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExerciseTypeUpdateComponent,
    resolve: {
      exerciseType: ExerciseTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.exerciseType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
