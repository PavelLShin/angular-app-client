import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NotificationModule } from '../notofication/notification.module';
import { UserDataService } from 'src/services/user-data/user-data.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    NotificationModule,
    MatButtonModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [UserDataService],
  exports: [HomeComponent],
})
export class HomeModule {}
