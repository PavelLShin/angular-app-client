import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { NotificationModule } from '../notofication/notification.module';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    NotificationModule,
  ],
  providers: [],
  exports: [RegistrationComponent],
})
export class RegistrationModule {}
