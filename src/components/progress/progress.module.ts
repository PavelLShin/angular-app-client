import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress.component';

@NgModule({
  declarations: [ProgressComponent],
  imports: [CommonModule],
  providers: [],
  exports: [ProgressComponent],
})
export class ProgressModule {}
