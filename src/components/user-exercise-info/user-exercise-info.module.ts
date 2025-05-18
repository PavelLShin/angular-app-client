import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationModule } from '../notofication/notification.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserExerciseInfoComponent } from './user-exercise-info.component';

@NgModule({
  declarations: [UserExerciseInfoComponent],
  imports: [CommonModule, NotificationModule, MatButtonModule, MatSelectModule],
  providers: [],
  exports: [UserExerciseInfoComponent],
})
export class UserExerciseInfoModule {}
