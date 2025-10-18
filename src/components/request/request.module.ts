import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RequestComponent } from './request.component';
import { MatButtonModule } from '@angular/material/button';
import { NotificationModule } from '../notofication/notification.module';

@NgModule({
  declarations: [RequestComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    NotificationModule,
  ],
  providers: [],
  exports: [RequestComponent],
})
export class RequestModule {}
