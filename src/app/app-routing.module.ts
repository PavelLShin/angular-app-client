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
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'progress', component: ProgressComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', component: RegistrationComponent },
];

@NgModule({
  imports: [ReactiveFormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
