import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: './notofication.component.html',
  styleUrls: ['./notofication.component.css'],
})
export class NotoficationComponent implements OnInit {
  @Input() message: string = '';
  @Input() duration: number = 3000;
  public isVisible: boolean = false;

  private timeoutId: any;

  ngOnInit(): void {
    if (this.message) {
      this.showNotification();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && changes['message'].currentValue) {
      this.showNotification();
    }
  }

  showNotification(): void {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, this.duration);
  }
}
