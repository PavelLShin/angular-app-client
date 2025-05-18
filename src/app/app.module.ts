import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeModule } from 'src/components/home/home.module';
import { ExerciseModule } from 'src/components/exercise/exercise.module';
import { AppRoutingModule } from './app-routing.module';
import { CalendarModule } from 'src/components/calendar/calendar.module';
import { ProgressModule } from 'src/components/progress/progress.module';
import { RegistrationModule } from 'src/components/registration/registration.module';
import { HttpClientModule } from '@angular/common/http';
import { ChangeUserDataModule } from 'src/components/change-user-data/change-user-data.module';
import { ResetPasswordModule } from 'src/components/reset-password/reset-password.module';
import { ChangeRegistrationDataModule } from 'src/components/change-registration-data/change-registration-data.module';
import { TypeConfigurableModule } from 'src/components/type-configurable/type-configurable.module';
import { ExerciseConfigurationModule } from 'src/components/exercise-configuration/exercise-configuration.module';
import { DeleteExercisesDialogModule } from 'src/components/delete-exercises-dialog/delete-exercises-dialog.module';
import { ExerciseInfoModule } from 'src/components/exercise-info/exercise-info.module';
import { UserExerciseModule } from 'src/components/user-exercise/user-exercise.module';
import { UserExerciseInfoModule } from 'src/components/user-exercise-info/user-exercise-info.module';
import { UserExerciseSettingsComponent } from '../components/user-exercise-settings/user-exercise-settings.component';
import { UserExerciseSettingsModule } from 'src/components/user-exercise-settings/user-exercise-settings.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HomeModule,
    ExerciseModule,
    CalendarModule,
    AppRoutingModule,
    ProgressModule,
    RegistrationModule,
    HttpClientModule,
    ChangeUserDataModule,
    ResetPasswordModule,
    ChangeRegistrationDataModule,
    TypeConfigurableModule,
    ExerciseConfigurationModule,
    DeleteExercisesDialogModule,
    ExerciseInfoModule,
    UserExerciseModule,
    UserExerciseInfoModule,
    UserExerciseSettingsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
