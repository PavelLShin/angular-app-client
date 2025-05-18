import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from '../notofication/notification.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExerciseConfigurationComponent } from './exercise-configuration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ExerciseConfigurationComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NotificationModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [],
  exports: [ExerciseConfigurationComponent],
})
export class ExerciseConfigurationModule {}
