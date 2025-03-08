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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
