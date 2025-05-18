import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationModule } from '../notofication/notification.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserExerciseComponent } from './user-exercise.component';

@NgModule({
  declarations: [UserExerciseComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NotificationModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [],
  exports: [UserExerciseComponent],
})
export class UserExerciseModule {}
