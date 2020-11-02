import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KipfitSharedModule } from 'app/shared/shared.module';
import { ExercisesSetTypeComponent } from './exercises-set-type.component';
import { ExercisesSetTypeDetailComponent } from './exercises-set-type-detail.component';
import { ExercisesSetTypeUpdateComponent } from './exercises-set-type-update.component';
import { ExercisesSetTypeDeleteDialogComponent } from './exercises-set-type-delete-dialog.component';
import { exercisesSetTypeRoute } from './exercises-set-type.route';

@NgModule({
  imports: [KipfitSharedModule, RouterModule.forChild(exercisesSetTypeRoute)],
  declarations: [
    ExercisesSetTypeComponent,
    ExercisesSetTypeDetailComponent,
    ExercisesSetTypeUpdateComponent,
    ExercisesSetTypeDeleteDialogComponent,
  ],
  entryComponents: [ExercisesSetTypeDeleteDialogComponent],
})
export class KipfitExercisesSetTypeModule {}
