import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgxMaskModule} from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    AddMeasurementComponent,
    EditMeasurementComponent,
    SubscriberProfileComponent,
    MeasurementsDataTableComponent,
    SubChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ChartsModule
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
