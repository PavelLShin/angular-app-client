import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NotificationModule } from '../notofication/notification.module';

@NgModule({
  declarations: [FriendsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    NotificationModule,
  ],
  providers: [],
  exports: [FriendsComponent],
})
export class FriendsModule {}
