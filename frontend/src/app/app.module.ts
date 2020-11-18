import {AppComponent} from './app.component';
import {AngularCropperjsModule} from "angular-cropperjs";
import {AuthGuard} from './core/guard/auth.guard';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {ChartsModule} from "ng2-charts";
import {CommonModule} from '@angular/common';
import {ErrorPageComponent} from './views/pages/error-page/error-page.component';
import {HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from './views/layout/layout.module';
import {NgModule} from '@angular/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxMaskModule} from 'ngx-mask';
import {NgxWebstorageModule} from 'ngx-webstorage';

import {AddMeasurementComponent} from './views/pages/forms/measurement/add/addMeasurement.component';
import {EditMeasurementComponent} from './views/pages/forms/measurement/edit/editMeasurement.component';
import {MeasurementsDataTableComponent} from "./views/pages/forms/subscriber/profile/measurementsDataTable.component";

import { AddSubscriberComponent } from './views/pages/forms/subscriber/add/addSubscriber.component';
import { EditSubscriberComponent } from './views/pages/forms/subscriber/edit/editSubscriber.component';
import {SubscriberDataTableComponent} from "./views/pages/tables/subscriberDataTable/subscriberDataTable.component";
import {SubscriberProfileComponent} from './views/pages/forms/subscriber/profile/subscriberProfile.component';
import {SubChartsComponent} from "./views/pages/forms/subscriber/profile/subCharts.component";

import {EditExercisesSetComponent} from './views/pages/forms/exercisesSet/edit/editExercisesSet.component'
import {AddExercisesSetComponent} from './views/pages/forms/exercisesSet/add/addExercisesSet.component'
import {AddRoutineComponent} from './views/pages/forms/routine/add/addRoutine.component'
import {EditRoutineComponent} from "./views/pages/forms/routine/edit/editRoutine.component";
import {RoutineDataTableComponent} from "./views/pages/tables/routineDataTable/routineDataTable.component";
import {ExercisesSetDataTableComponent} from "./views/pages/tables/exercisesSetDataTable/exercisesSetDataTable.component";

import {AddExerciseComponent} from "./views/pages/forms/exercises/add/addExercise.component";
import {EditExerciseComponent} from "./views/pages/forms/exercises/edit/editExercise.component";
import {ExercisesDataTableComponent} from "./views/pages/tables/exercisesDataTable/exercisesDataTable.component";
import {ExercisesFilterByTypeDataTableComponent} from "./views/pages/tables/exercisesFilterByTypeDataTable/exercisesFilterByTypeDataTable.component";

import {AddPlanComponent} from './views/pages/forms/plan/add/addPlan.component';
import {EditPlanComponent} from './views/pages/forms/plan/edit/editPlan.component';
import {PlanDataTableComponent} from './views/pages/tables/planDataTable/planDataTable.component';

import {AddUserComponent} from "./views/pages/forms/user/add/addUser.component";
import {UserDataTableComponent} from "./views/pages/tables/userDataTable/userDataTable.component";

import {UiComponentsModule} from "./views/pages/ui-components/ui-components.module";


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,

    AddMeasurementComponent,
    EditMeasurementComponent,
    MeasurementsDataTableComponent,

    AddRoutineComponent,
    EditRoutineComponent,
    RoutineDataTableComponent,

    EditExercisesSetComponent,
    AddExercisesSetComponent,
    ExercisesSetDataTableComponent,

    AddPlanComponent,
    EditPlanComponent,
    PlanDataTableComponent,

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
    ExercisesDataTableComponent,
    ExercisesFilterByTypeDataTableComponent
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
        NgxWebstorageModule.forRoot(),
        HttpClientModule,
        ChartsModule,
        AngularCropperjsModule,
        UiComponentsModule,
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
