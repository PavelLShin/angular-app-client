import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentUserExerciseComponent } from './current-user-exercise.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NotificationModule } from '../notofication/notification.module';
import { TimeFormatModule } from 'src/pipes/time-format/time-format.module';

@NgModule({
  declarations: [CurrentUserExerciseComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    NotificationModule,
    TimeFormatModule,
  ],
  providers: [],
  exports: [CurrentUserExerciseComponent],
})
export class CurrentUserExerciseModule {}
