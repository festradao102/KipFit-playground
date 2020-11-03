import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KipfitSharedModule } from 'app/shared/shared.module';
import { ObjectiveTypeComponent } from './objective-type.component';
import { ObjectiveTypeDetailComponent } from './objective-type-detail.component';
import { ObjectiveTypeUpdateComponent } from './objective-type-update.component';
import { ObjectiveTypeDeleteDialogComponent } from './objective-type-delete-dialog.component';
import { objectiveTypeRoute } from './objective-type.route';

@NgModule({
  imports: [KipfitSharedModule, RouterModule.forChild(objectiveTypeRoute)],
  declarations: [ObjectiveTypeComponent, ObjectiveTypeDetailComponent, ObjectiveTypeUpdateComponent, ObjectiveTypeDeleteDialogComponent],
  entryComponents: [ObjectiveTypeDeleteDialogComponent],
})
export class KipfitObjectiveTypeModule {}
