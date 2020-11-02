import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'fit-user',
        loadChildren: () => import('./fit-user/fit-user.module').then(m => m.KipfitFitUserModule),
      },
      {
        path: 'subscriber',
        loadChildren: () => import('./subscriber/subscriber.module').then(m => m.KipfitSubscriberModule),
      },
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.KipfitRoleModule),
      },
      {
        path: 'measurement',
        loadChildren: () => import('./measurement/measurement.module').then(m => m.KipfitMeasurementModule),
      },
      {
        path: 'guided-training',
        loadChildren: () => import('./guided-training/guided-training.module').then(m => m.KipfitGuidedTrainingModule),
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.KipfitScheduleModule),
      },
      {
        path: 'plan',
        loadChildren: () => import('./plan/plan.module').then(m => m.KipfitPlanModule),
      },
      {
        path: 'objective-type',
        loadChildren: () => import('./objective-type/objective-type.module').then(m => m.KipfitObjectiveTypeModule),
      },
      {
        path: 'routine',
        loadChildren: () => import('./routine/routine.module').then(m => m.KipfitRoutineModule),
      },
      {
        path: 'exercises-set',
        loadChildren: () => import('./exercises-set/exercises-set.module').then(m => m.KipfitExercisesSetModule),
      },
      {
        path: 'exercises-set-type',
        loadChildren: () => import('./exercises-set-type/exercises-set-type.module').then(m => m.KipfitExercisesSetTypeModule),
      },
      {
        path: 'exercise',
        loadChildren: () => import('./exercise/exercise.module').then(m => m.KipfitExerciseModule),
      },
      {
        path: 'exercise-type',
        loadChildren: () => import('./exercise-type/exercise-type.module').then(m => m.KipfitExerciseTypeModule),
      },
      {
        path: 'subscription-payment',
        loadChildren: () => import('./subscription-payment/subscription-payment.module').then(m => m.KipfitSubscriptionPaymentModule),
      },
      {
        path: 'system-parameter',
        loadChildren: () => import('./system-parameter/system-parameter.module').then(m => m.KipfitSystemParameterModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class KipfitEntityModule {}
