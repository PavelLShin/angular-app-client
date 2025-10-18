import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/components/home/home.component';
import { ExerciseComponent } from 'src/components/exercise/exercise.component';
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
import { StartUserTraningComponent } from 'src/components/start-user-traning/start-user-traning.component';
import { CurrentUserTraningComponent } from 'src/components/current-user-traning/current-user-traning.component';
import { CurrentUserExerciseComponent } from 'src/components/current-user-exercise/current-user-exercise.component';
import { ResultTraningComponent } from 'src/components/result-traning/result-traning.component';
import { FriendsComponent } from 'src/components/friends/friends.component';
import { RequestComponent } from 'src/components/request/request.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
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
  {
    path: 'calendar/:userId',
    component: CalendarComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'configurable', component: TypeConfigurableComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'request', component: RequestComponent },
  {
    path: 'exercise-configuration/:id',
    component: ExerciseConfigurationComponent,
  },
  {
    path: 'exercise-info/:id',
    component: ExerciseInfoComponent,
  },
  {
    path: 'user-exercise-info/:id/:userId',
    component: UserExerciseInfoComponent,
  },
  {
    path: 'user-exercise-settings/:id/:userId',
    component: UserExerciseSettingsComponent,
  },
  { path: 'user-traning/:id', component: UserExerciseComponent },
  { path: 'start-user-traning/:id', component: StartUserTraningComponent },

  {
    path: `current-user-traning/:id`,
    component: CurrentUserTraningComponent,
  },
  {
    path: `current-user-traning/:dayId/:exerciseId/:currentPracticeDay`,
    component: CurrentUserExerciseComponent,
  },
  {
    path: `user-traning-details/:currentPracticeDay/:userId`,
    component: ResultTraningComponent,
  },
  { path: '**', component: RegistrationComponent },
];

@NgModule({
  imports: [ReactiveFormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
