import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISubscriptionPayment, SubscriptionPayment } from 'app/shared/model/subscription-payment.model';
import { SubscriptionPaymentService } from './subscription-payment.service';
import { SubscriptionPaymentComponent } from './subscription-payment.component';
import { SubscriptionPaymentDetailComponent } from './subscription-payment-detail.component';
import { SubscriptionPaymentUpdateComponent } from './subscription-payment-update.component';

@Injectable({ providedIn: 'root' })
export class SubscriptionPaymentResolve implements Resolve<ISubscriptionPayment> {
  constructor(private service: SubscriptionPaymentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubscriptionPayment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((subscriptionPayment: HttpResponse<SubscriptionPayment>) => {
          if (subscriptionPayment.body) {
            return of(subscriptionPayment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SubscriptionPayment());
  }
}

export const subscriptionPaymentRoute: Routes = [
  {
    path: '',
    component: SubscriptionPaymentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.subscriptionPayment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubscriptionPaymentDetailComponent,
    resolve: {
      subscriptionPayment: SubscriptionPaymentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.subscriptionPayment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubscriptionPaymentUpdateComponent,
    resolve: {
      subscriptionPayment: SubscriptionPaymentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.subscriptionPayment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubscriptionPaymentUpdateComponent,
    resolve: {
      subscriptionPayment: SubscriptionPaymentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'kipfitApp.subscriptionPayment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
