import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from './exercise.component';
import { NotificationModule } from '../notofication/notification.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ExerciseComponent],
  imports: [CommonModule, NotificationModule, MatButtonModule, MatIconModule],
  providers: [],
  exports: [ExerciseComponent],
})
export class ExerciseModule {}
