import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationModule } from '../notofication/notification.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { StartUserTraningComponent } from './start-user-traning.component';

@NgModule({
  declarations: [StartUserTraningComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NotificationModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [],
  exports: [StartUserTraningComponent],
})
export class StartUserTraningModule {}
