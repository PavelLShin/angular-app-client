import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: './notofication.component.html',
  styleUrls: ['./notofication.component.css'],
})
export class NotoficationComponent implements OnInit {
  @Input() message: string = '';
  @Input() duration: number = 3000;
  @Input() bgColor!: string;
  public isVisible: boolean = false;

  ngOnInit(): void {
    if (this.message) {
      this.showNotification();
    }
  }

  getColor(): string {
    return this.bgColor == 'error' ? 'error' : 'success';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && changes['message'].currentValue) {
      this.showNotification();
    }
    if (changes['bgColor'] && changes['bgColor'].currentValue) {
      this.getColor();
    }
  }

  showNotification(): void {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, this.duration);
  }
}
