import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KipfitSharedModule } from 'app/shared/shared.module';
import { GuidedTrainingComponent } from './guided-training.component';
import { GuidedTrainingDetailComponent } from './guided-training-detail.component';
import { GuidedTrainingUpdateComponent } from './guided-training-update.component';
import { GuidedTrainingDeleteDialogComponent } from './guided-training-delete-dialog.component';
import { guidedTrainingRoute } from './guided-training.route';

@NgModule({
  imports: [KipfitSharedModule, RouterModule.forChild(guidedTrainingRoute)],
  declarations: [
    GuidedTrainingComponent,
    GuidedTrainingDetailComponent,
    GuidedTrainingUpdateComponent,
    GuidedTrainingDeleteDialogComponent,
  ],
  entryComponents: [GuidedTrainingDeleteDialogComponent],
})
export class KipfitGuidedTrainingModule {}
