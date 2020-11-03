import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IObjectiveType, ObjectiveType } from 'app/shared/model/objective-type.model';
import { ObjectiveTypeService } from './objective-type.service';
import { ObjectiveTypeComponent } from './objective-type.component';
import { ObjectiveTypeDetailComponent } from './objective-type-detail.component';
import { ObjectiveTypeUpdateComponent } from './objective-type-update.component';

@Injectable({ providedIn: 'root' })
export class ObjectiveTypeResolve implements Resolve<IObjectiveType> {
  constructor(private service: ObjectiveTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IObjectiveType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((objectiveType: HttpResponse<ObjectiveType>) => {
          if (objectiveType.body) {
            return of(objectiveType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ObjectiveType());
  }
}

export const objectiveTypeRoute: Routes = [
  {
    path: '',
    component: ObjectiveTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.objectiveType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ObjectiveTypeDetailComponent,
    resolve: {
      objectiveType: ObjectiveTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.objectiveType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ObjectiveTypeUpdateComponent,
    resolve: {
      objectiveType: ObjectiveTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.objectiveType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ObjectiveTypeUpdateComponent,
    resolve: {
      objectiveType: ObjectiveTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.objectiveType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
