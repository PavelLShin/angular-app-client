import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogStateService } from 'src/services/dialog/dialog-state.service';

@Component({
  selector: 'app-delete-exercises-dialog',
  templateUrl: './delete-exercises-dialog.component.html',
  styleUrls: ['./delete-exercises-dialog.component.css'],
})
export class DeleteExercisesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteExercisesDialogComponent>,
    public dialogService: DialogStateService
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
    this.dialogService.setDialogState(false);
  }

  onCancel(): void {
    this.dialogRef.close(false);
    this.dialogService.setDialogState(false);
  }
}
