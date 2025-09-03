import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ProgressComponent],
  imports: [CommonModule, ChartsModule],
  providers: [],
  exports: [ProgressComponent],
})
export class ProgressModule {}
