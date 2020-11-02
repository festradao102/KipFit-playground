import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KipfitSharedModule } from 'app/shared/shared.module';
import { MeasurementComponent } from './measurement.component';
import { MeasurementDetailComponent } from './measurement-detail.component';
import { MeasurementUpdateComponent } from './measurement-update.component';
import { MeasurementDeleteDialogComponent } from './measurement-delete-dialog.component';
import { measurementRoute } from './measurement.route';

@NgModule({
  imports: [KipfitSharedModule, RouterModule.forChild(measurementRoute)],
  declarations: [MeasurementComponent, MeasurementDetailComponent, MeasurementUpdateComponent, MeasurementDeleteDialogComponent],
  entryComponents: [MeasurementDeleteDialogComponent],
})
export class KipfitMeasurementModule {}
