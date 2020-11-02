import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KipfitSharedModule } from 'app/shared/shared.module';
import { SystemParameterComponent } from './system-parameter.component';
import { SystemParameterDetailComponent } from './system-parameter-detail.component';
import { SystemParameterUpdateComponent } from './system-parameter-update.component';
import { SystemParameterDeleteDialogComponent } from './system-parameter-delete-dialog.component';
import { systemParameterRoute } from './system-parameter.route';

@NgModule({
  imports: [KipfitSharedModule, RouterModule.forChild(systemParameterRoute)],
  declarations: [
    SystemParameterComponent,
    SystemParameterDetailComponent,
    SystemParameterUpdateComponent,
    SystemParameterDeleteDialogComponent,
  ],
  entryComponents: [SystemParameterDeleteDialogComponent],
})
export class KipfitSystemParameterModule {}
