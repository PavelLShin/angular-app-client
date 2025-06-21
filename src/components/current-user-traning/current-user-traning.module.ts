import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentUserTraningComponent } from './current-user-traning.component';
import { NotificationModule } from '../notofication/notification.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [CurrentUserTraningComponent],
  imports: [CommonModule, NotificationModule, MatButtonModule, MatSelectModule],
  providers: [],
  exports: [CurrentUserTraningComponent],
})
export class CurrentUserTraningModule {}
