import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/components/home/home.component';
import { ExerciseComponent } from 'src/components/exercise/exercise.component';
import { ProgressComponent } from 'src/components/progress/progress.component';
import { CalendarComponent } from 'src/components/calendar/calendar.component';
import { RegistrationComponent } from 'src/components/registration/registration.component';
import { AuthGuard } from 'src/guards/AuthGuard';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeUserDataComponent } from 'src/components/change-user-data/change-user-data.component';
import { ResetPasswordComponent } from 'src/components/reset-password/reset-password.component';
import { ChangeRegistrationDataComponent } from 'src/components/change-registration-data/change-registration-data.component';
import { TypeConfigurableComponent } from 'src/components/type-configurable/type-configurable.component';
import { ExerciseConfigurationComponent } from 'src/components/exercise-configuration/exercise-configuration.component';
import { ExerciseInfoComponent } from 'src/components/exercise-info/exercise-info.component';
import { UserExerciseComponent } from 'src/components/user-exercise/user-exercise.component';
import { UserExerciseInfoComponent } from 'src/components/user-exercise-info/user-exercise-info.component';
import { UserExerciseSettingsComponent } from 'src/components/user-exercise-settings/user-exercise-settings.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'change-user-data',
    component: ChangeUserDataComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change-registration-data',
    component: ChangeRegistrationDataComponent,
    canActivate: [AuthGuard],
  },

  { path: 'exercise', component: ExerciseComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'progress', component: ProgressComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'configurable', component: TypeConfigurableComponent },
  {
    path: 'exercise-configuration/:id',
    component: ExerciseConfigurationComponent,
  },
  {
    path: 'exercise-info/:id',
    component: ExerciseInfoComponent,
  },
  {
    path: 'user-exercise-info/:id',
    component: UserExerciseInfoComponent,
  },
  {
    path: 'user-exercise-settings/:id',
    component: UserExerciseSettingsComponent,
  },
  { path: 'user-traning/:id', component: UserExerciseComponent },
  { path: '**', component: RegistrationComponent },
];

@NgModule({
  imports: [ReactiveFormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
