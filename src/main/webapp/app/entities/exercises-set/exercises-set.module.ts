import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KipfitSharedModule } from 'app/shared/shared.module';
import { ExercisesSetComponent } from './exercises-set.component';
import { ExercisesSetDetailComponent } from './exercises-set-detail.component';
import { ExercisesSetUpdateComponent } from './exercises-set-update.component';
import { ExercisesSetDeleteDialogComponent } from './exercises-set-delete-dialog.component';
import { exercisesSetRoute } from './exercises-set.route';

@NgModule({
  imports: [KipfitSharedModule, RouterModule.forChild(exercisesSetRoute)],
  declarations: [ExercisesSetComponent, ExercisesSetDetailComponent, ExercisesSetUpdateComponent, ExercisesSetDeleteDialogComponent],
  entryComponents: [ExercisesSetDeleteDialogComponent],
})
export class KipfitExercisesSetModule {}
