import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteExercisesDialogComponent } from './delete-exercises-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DeleteExercisesDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  providers: [],
  exports: [DeleteExercisesDialogComponent],
})
export class DeleteExercisesDialogModule {}
