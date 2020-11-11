import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgxMaskModule} from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import {AddMeasurementComponent} from './views/pages/forms/measurements/add/addMeasurement.component';
import {EditMeasurementComponent} from './views/pages/forms/measurements/edit/editMeasurement.component';

import {MeasurementsDataTableComponent} from './views/pages/forms/subscribers/profile/measurementsDataTable.component';
import {SubChartsComponent} from './views/pages/forms/subscribers/profile/subCharts.component';

import {SubscriberProfileComponent} from './views/pages/forms/subscribers/profile/subscriberProfile.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AddSubscriberComponent } from './views/pages/forms/subscriber/add/addSubscriber.component';
import { EditSubscriberComponent } from './views/pages/forms/subscriber/edit/editSubscriber.component';
import { SubscriberTableComponent } from './views/pages/tables/subscriber-table/subscriber-table.component';
import {AngularCropperjsModule} from 'angular-cropperjs';
import {AddPlanComponent} from './views/pages/forms/plan/add/addPlan.component';
import {EditPlanComponent} from './views/pages/forms/plan/edit/editPlan.component';
import {ListPlanComponent} from './views/pages/forms/plan/list/listPlan.component';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    AddSubscriberComponent,
    EditSubscriberComponent,
    SubscriberTableComponent,
    AddMeasurementComponent,
    EditMeasurementComponent,
    SubscriberProfileComponent,
    MeasurementsDataTableComponent,
    SubChartsComponent,
    AddPlanComponent,
    EditPlanComponent,
    ListPlanComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        FormsModule,
        HttpClientModule,
        NgxMaskModule.forRoot(),
        HttpClientModule,
        ChartsModule,
        AngularCropperjsModule,
        NgSelectModule
    ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
