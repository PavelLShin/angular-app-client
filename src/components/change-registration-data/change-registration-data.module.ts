import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationModule } from '../notofication/notification.module';
import { UserDataService } from 'src/services/user-data/user-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ChangeRegistrationDataComponent } from './change-registration-data.component';

@NgModule({
  declarations: [ChangeRegistrationDataComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NotificationModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [UserDataService],
  exports: [ChangeRegistrationDataComponent],
})
export class ChangeRegistrationDataModule {}
