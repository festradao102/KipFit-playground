import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KipfitSharedModule } from 'app/shared/shared.module';
import { ExerciseTypeComponent } from './exercise-type.component';
import { ExerciseTypeDetailComponent } from './exercise-type-detail.component';
import { ExerciseTypeUpdateComponent } from './exercise-type-update.component';
import { ExerciseTypeDeleteDialogComponent } from './exercise-type-delete-dialog.component';
import { exerciseTypeRoute } from './exercise-type.route';

@NgModule({
  imports: [KipfitSharedModule, RouterModule.forChild(exerciseTypeRoute)],
  declarations: [ExerciseTypeComponent, ExerciseTypeDetailComponent, ExerciseTypeUpdateComponent, ExerciseTypeDeleteDialogComponent],
  entryComponents: [ExerciseTypeDeleteDialogComponent],
})
export class KipfitExerciseTypeModule {}
