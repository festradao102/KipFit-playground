import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgxMaskModule} from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts";
import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import {AddMeasurementComponent} from './views/pages/forms/measurement/add/addMeasurement.component';
import {EditMeasurementComponent} from './views/pages/forms/measurement/edit/editMeasurement.component';
import {MeasurementsDataTableComponent} from "./views/pages/forms/subscriber/profile/measurementsDataTable.component";

import {SubChartsComponent} from './views/pages/forms/subscriber/profile/subCharts.component';

import {SubscriberProfileComponent} from './views/pages/forms/subscriber/profile/subscriberProfile.component';


import { AddSubscriberComponent } from './views/pages/forms/subscriber/add/addSubscriber.component';
import { EditSubscriberComponent } from './views/pages/forms/subscriber/edit/editSubscriber.component';
import {SubscriberDataTableComponent} from "./views/pages/tables/subscriberDataTable/subscriberDataTable.component";

import {EditExerciseComponent} from "./views/pages/forms/exercises/edit-exercise/edit-exercise.component";
import {ListExercisesComponent} from "./views/pages/forms/exercises/list-exercises/list-exercises.component";
import {AddExerciseComponent} from "./views/pages/forms/exercises/add-exercise/add-exercise.component";

import {AngularCropperjsModule} from "angular-cropperjs";
import {AddPlanComponent} from './views/pages/forms/plan/add/addPlan.component';
import {EditPlanComponent} from './views/pages/forms/plan/edit/editPlan.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {AddUserComponent} from "./views/pages/forms/user/add/addUser.component";
import {UserDataTableComponent} from "./views/pages/tables/userDataTable/userDataTable.component";



import { CommonModule } from '@angular/common';
import {PlanDataTableComponent} from './views/pages/tables/planDataTable/planDataTable.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,

    AddMeasurementComponent,
    EditMeasurementComponent,
    MeasurementsDataTableComponent,

    AddSubscriberComponent,
    EditSubscriberComponent,
    SubscriberDataTableComponent,
    AddMeasurementComponent,
    EditMeasurementComponent,
    SubscriberProfileComponent,
    SubscriberDataTableComponent,
    SubChartsComponent,

    AddUserComponent,
    UserDataTableComponent,

    AddExerciseComponent,
    EditExerciseComponent,
    ListExercisesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    ChartsModule,
    AngularCropperjsModule
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
