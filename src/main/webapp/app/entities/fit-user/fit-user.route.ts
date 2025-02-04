import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFitUser, FitUser } from 'app/shared/model/fit-user.model';
import { FitUserService } from './fit-user.service';
import { FitUserComponent } from './fit-user.component';
import { FitUserDetailComponent } from './fit-user-detail.component';
import { FitUserUpdateComponent } from './fit-user-update.component';

@Injectable({ providedIn: 'root' })
export class FitUserResolve implements Resolve<IFitUser> {
  constructor(private service: FitUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFitUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fitUser: HttpResponse<FitUser>) => {
          if (fitUser.body) {
            return of(fitUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FitUser());
  }
}

export const fitUserRoute: Routes = [
  {
    path: '',
    component: FitUserComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.fitUser.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FitUserDetailComponent,
    resolve: {
      fitUser: FitUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.fitUser.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FitUserUpdateComponent,
    resolve: {
      fitUser: FitUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.fitUser.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FitUserUpdateComponent,
    resolve: {
      fitUser: FitUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.fitUser.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
