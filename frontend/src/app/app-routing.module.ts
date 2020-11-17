import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { UserRouteAccessService} from "./core/auth/user-route-access-service";
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import {AddSubscriberComponent} from './views/pages/forms/subscriber/add/addSubscriber.component';
import {EditSubscriberComponent} from './views/pages/forms/subscriber/edit/editSubscriber.component';
import {SubscriberDataTableComponent} from './views/pages/tables/subscriberDataTable/subscriberDataTable.component';
import {SubscriberProfileComponent} from './views/pages/forms/subscriber/profile/subscriberProfile.component';

import {AddMeasurementComponent} from './views/pages/forms/measurement/add/addMeasurement.component';
import {EditMeasurementComponent} from './views/pages/forms/measurement/edit/editMeasurement.component';

import {AddRoutineComponent} from './views/pages/forms/routine/add/addRoutine.component'
import {EditRoutineComponent} from "./views/pages/forms/routine/edit/editRoutine.component";
import {RoutineDataTableComponent} from "./views/pages/tables/routineDataTable/routineDataTable.component";
import {EditExercisesSetComponent} from "./views/pages/forms/exercisesSet/edit/editExercisesSet.component";

import {AddPlanComponent} from './views/pages/forms/plan/add/addPlan.component';

import {AddUserComponent} from "./views/pages/forms/user/add/addUser.component";
import {UserDataTableComponent} from "./views/pages/tables/userDataTable/userDataTable.component";
import {ChartsGraphsComponent} from "./views/pages/charts-graphs/charts-graphs.component";
import {EditPlanComponent} from './views/pages/forms/plan/edit/editPlan.component';
import {AuthGuard} from "./core/guard/auth.guard";

import {AddExerciseComponent} from "./views/pages/forms/exercises/add/addExercise.component";
import {EditExerciseComponent} from "./views/pages/forms/exercises/edit/editExercise.component";
import {ExercisesDataTableComponent} from './views/pages/tables/exercisesDataTable/exercisesDataTable.component';
import {ExercisesFilterByTypeDataTableComponent} from "./views/pages/tables/exercisesFilterByTypeDataTable/exercisesFilterByTypeDataTable.component";

const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      { path: 'add-subscriber', component: AddSubscriberComponent },
      { path: 'subscribers', component: SubscriberDataTableComponent },
      { path: 'subscribers/:id', component: EditSubscriberComponent, pathMatch: 'full' },
      { path: 'subscriber-profile/:id', component: SubscriberProfileComponent },

      { path: 'add-routine', component: AddRoutineComponent },
      { path: 'routines', component: RoutineDataTableComponent },
      { path: 'routines/:id', component: EditRoutineComponent, pathMatch: 'full' },

      { path: 'add-user/:id',  component: AddUserComponent },
      { path: 'users', component: UserDataTableComponent },

      { path: 'add-measurement', component: AddMeasurementComponent},
      { path: 'measurements/:id', component: EditMeasurementComponent},

      { path: 'add-plan', component: AddPlanComponent},
      { path: 'plans/:id', component: EditPlanComponent},

      { path: 'add-exercise', component: AddExerciseComponent },
      { path: 'exercises/:id', component: EditExerciseComponent, pathMatch: 'full' },
      { path: 'exercises', component: ExercisesDataTableComponent},
      { path: 'exercises-types/:id', component: ExercisesFilterByTypeDataTableComponent, pathMatch: 'full'},
      { path: 'exercises-types', redirectTo: 'exercises-types/1', pathMatch: 'full'},

      {
        path: 'charts', component: ChartsGraphsComponent // TODO: Remove this
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    ]
  },
  {
    path: 'error', component: ErrorPageComponent,
    data: { 'type': 404, 'title': 'Ruta no encontrada', 'desc': 'La pagina que intentas buscar no existe.' }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
