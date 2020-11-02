import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KipfitSharedModule } from 'app/shared/shared.module';
import { RoutineComponent } from './routine.component';
import { RoutineDetailComponent } from './routine-detail.component';
import { RoutineUpdateComponent } from './routine-update.component';
import { RoutineDeleteDialogComponent } from './routine-delete-dialog.component';
import { routineRoute } from './routine.route';

@NgModule({
  imports: [KipfitSharedModule, RouterModule.forChild(routineRoute)],
  declarations: [RoutineComponent, RoutineDetailComponent, RoutineUpdateComponent, RoutineDeleteDialogComponent],
  entryComponents: [RoutineDeleteDialogComponent],
})
export class KipfitRoutineModule {}
