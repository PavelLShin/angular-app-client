import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { TimerTraningService } from 'src/services/timer-traning/timer-traning.service';

@Component({
  selector: 'app-timer-traning',
  templateUrl: './timer-traning.component.html',
  styleUrls: ['./timer-traning.component.css'],
})
export class TimerTraningComponent implements OnInit {
  public isRunning!: boolean;

  constructor(
    private timerTraningService: TimerTraningService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.timerTraningService.stateTraning$.subscribe((isTraning) => {
      this.isRunning = isTraning;
      if (this.isRunning) {
        this.start();
      } else {
        this.reset();
      }
      this.cdr.detectChanges();
    });
  }

  public elapsedTime: string = '00:00:00';
  private subscription: Subscription = new Subscription();
  private totalTime: number = 0;

  start() {
    this.subscription = interval(1000).subscribe(() => {
      this.totalTime++;
      this.updateElapsedTime();
    });
  }

  reset() {
    this.totalTime = 0;
    this.elapsedTime = '00:00:00';
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateElapsedTime() {
    const hours = Math.floor(this.totalTime / 3600);
    const minutes = Math.floor((this.totalTime % 3600) / 60);
    const seconds = this.totalTime % 60;

    this.elapsedTime =
      this.formatTime(hours) +
      ':' +
      this.formatTime(minutes) +
      ':' +
      this.formatTime(seconds);
  }

  private formatTime(num: number): string {
    return ('0' + num).slice(-2);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
