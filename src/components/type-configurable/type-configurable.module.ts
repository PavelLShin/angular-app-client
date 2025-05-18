import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TypeConfigurableComponent } from './type-configurable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationModule } from '../notofication/notification.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [TypeConfigurableComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NotificationModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [],
  exports: [TypeConfigurableComponent],
})
export class TypeConfigurableModule {}
