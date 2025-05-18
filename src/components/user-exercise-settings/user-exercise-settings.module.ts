import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationModule } from '../notofication/notification.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserExerciseSettingsComponent } from './user-exercise-settings.component';

@NgModule({
  declarations: [UserExerciseSettingsComponent],
  imports: [CommonModule, NotificationModule, MatButtonModule, MatSelectModule],
  providers: [],
  exports: [UserExerciseSettingsComponent],
})
export class UserExerciseSettingsModule {}
