import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KipfitSharedModule } from 'app/shared/shared.module';
import { FitUserComponent } from './fit-user.component';
import { FitUserDetailComponent } from './fit-user-detail.component';
import { FitUserUpdateComponent } from './fit-user-update.component';
import { FitUserDeleteDialogComponent } from './fit-user-delete-dialog.component';
import { fitUserRoute } from './fit-user.route';

@NgModule({
  imports: [KipfitSharedModule, RouterModule.forChild(fitUserRoute)],
  declarations: [FitUserComponent, FitUserDetailComponent, FitUserUpdateComponent, FitUserDeleteDialogComponent],
  entryComponents: [FitUserDeleteDialogComponent],
})
export class KipfitFitUserModule {}
