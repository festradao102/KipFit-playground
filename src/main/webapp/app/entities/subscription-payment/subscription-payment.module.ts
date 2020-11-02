import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KipfitSharedModule } from 'app/shared/shared.module';
import { SubscriptionPaymentComponent } from './subscription-payment.component';
import { SubscriptionPaymentDetailComponent } from './subscription-payment-detail.component';
import { SubscriptionPaymentUpdateComponent } from './subscription-payment-update.component';
import { SubscriptionPaymentDeleteDialogComponent } from './subscription-payment-delete-dialog.component';
import { subscriptionPaymentRoute } from './subscription-payment.route';

@NgModule({
  imports: [KipfitSharedModule, RouterModule.forChild(subscriptionPaymentRoute)],
  declarations: [
    SubscriptionPaymentComponent,
    SubscriptionPaymentDetailComponent,
    SubscriptionPaymentUpdateComponent,
    SubscriptionPaymentDeleteDialogComponent,
  ],
  entryComponents: [SubscriptionPaymentDeleteDialogComponent],
})
export class KipfitSubscriptionPaymentModule {}
