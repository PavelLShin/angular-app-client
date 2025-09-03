import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { NotificationModule } from '../notofication/notification.module';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, NotificationModule],
  providers: [],
  exports: [CalendarComponent],
})
export class CalendarModule {}
