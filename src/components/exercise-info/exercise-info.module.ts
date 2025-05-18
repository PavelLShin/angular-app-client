import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationModule } from '../notofication/notification.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExerciseInfoComponent } from './exercise-info.component';

@NgModule({
  declarations: [ExerciseInfoComponent],
  imports: [CommonModule],
  providers: [],
  exports: [ExerciseInfoComponent],
})
export class ExerciseInfoModule {}
