import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import {AddSubscriberComponent} from './views/pages/forms/subscriber/add/addSubscriber.component';
import {AddMeasurementComponent} from './views/pages/forms/measurement/add/addMeasurement.component';
import {EditMeasurementComponent} from './views/pages/forms/measurement/edit/editMeasurement.component';
import {SubscriberProfileComponent} from './views/pages/forms/subscriber/profile/subscriberProfile.component';
import {EditSubscriberComponent} from './views/pages/forms/subscriber/edit/editSubscriber.component';
import {SubscriberDataTableComponent} from './views/pages/tables/subscriberDataTable/subscriberDataTable.component';
import {AddPlanComponent} from './views/pages/forms/plan/add/addPlan.component';

import {AddUserComponent} from "./views/pages/forms/user/add/addUser.component";
import {UserDataTableComponent} from "./views/pages/tables/userDataTable/userDataTable.component";
import {EditExerciseComponent} from "./views/pages/forms/exercises/edit-exercise/edit-exercise.component";
import {ListExercisesComponent} from "./views/pages/forms/exercises/list-exercises/list-exercises.component";
import {AddExerciseComponent} from "./views/pages/forms/exercises/add-exercise/add-exercise.component";
import {ChartsGraphsComponent} from "./views/pages/charts-graphs/charts-graphs.component";
import {EditPlanComponent} from './views/pages/forms/plan/edit/editPlan.component';

const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      { path: 'add-subscriber', component: AddSubscriberComponent },
      { path: 'subscribers', component: SubscriberDataTableComponent },
      { path: 'subscribers/:id', component: EditSubscriberComponent, pathMatch: 'full' },
      { path: 'subscriber-profile/:id', component: SubscriberProfileComponent },

      { path: 'add-user/:id',  component: AddUserComponent },
      { path: 'users', component: UserDataTableComponent },

      { path: 'add-measurement', component: AddMeasurementComponent},
      { path: 'measurements/:id', component: EditMeasurementComponent},
      { path: 'add-plan', component: AddPlanComponent},
      { path: 'plans/:id', component: EditPlanComponent},
      {
        path: 'exercises', component: ListExercisesComponent
      },
      {
        path: 'add-exercise', component: AddExerciseComponent
      },
      {
        path: 'exercises/:id', pathMatch: 'full', component: EditExerciseComponent
      },

      {
        path: 'charts', component: ChartsGraphsComponent
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
