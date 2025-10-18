import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IUserPracticeDay } from 'src/interfaces/user-practice-day/IUserPracticeDay';
import { UserTraningPracticeService } from 'src/services/userTraningPractice/user-traning-practice.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  public loaderVisible: boolean = false;
  public errorMessage: string = '';

  public TODAY: Date = new Date();

  public date: Date = new Date();

  public daysInMoth: any[] = [];

  public monthTitle: string[] = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  public currentMonth!: string;
  public currentYear!: string;
  public pageUserId!: string | null;
  public userProfileId: string | null = localStorage.getItem('id');

  public userExercisesData: IUserPracticeDay[] = [];

  constructor(
    private userTraningPracticeService: UserTraningPracticeService,
    public route: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserIdInfo();
    this.getUserTranings(this.pageUserId);
    this.generateCalendar(this.date);
  }

  getUserIdInfo(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.pageUserId = params.get('userId');
    });
  }

  getUserTranings(id: string | null): void {
    this.loaderVisible = true;
    this.userTraningPracticeService
      .getUserTranings(id)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserPracticeDay[];
        })
      )
      .subscribe({
        next: (data: IUserPracticeDay[]) => {
          this.userExercisesData = data;
          this.generateCalendar(this.date);
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  generateCalendar(data: Date): void {
    let month = data.getMonth();
    let year = data.getFullYear();

    this.currentYear = year.toString();
    this.currentMonth = this.monthTitle[month];

    let lastDay = new Date(year, month + 1, 0).getDate();

    this.daysInMoth = [];
    let firstDay = new Date(year, month, 1).getDay();
    let lastDayLastMonth = new Date(year, month, 0);
    if (firstDay != 1) {
      let ldlm = lastDayLastMonth.getDay();
      let ldlmDay = lastDayLastMonth.getDate();

      for (let day = ldlmDay - ldlm + 1; day <= ldlmDay; day++) {
        const currentDate = new Date(year, month - 1, day);
        this.daysInMoth.push(currentDate);
      }
    }

    for (let day = 1; day <= lastDay; day++) {
      const currentDate = new Date(year, month, day);
      this.daysInMoth.push(currentDate);
    }

    this.markTrainingDays();
  }

  markTrainingDays(): void {
    this.daysInMoth.forEach((day) => {
      day.tranings = [];
      this.userExercisesData.forEach((training) => {
        const trainingDate = new Date(training.start);
        if (
          trainingDate.getDate() === day.getDate() &&
          trainingDate.getMonth() === day.getMonth() &&
          trainingDate.getFullYear() === day.getFullYear()
        ) {
          day.tranings.push(training);
        }
      });
    });
  }

  changeMonth(change: number): void {
    this.date.setMonth(this.date.getMonth() + change);
    this.generateCalendar(this.date);
  }

  dayTraningInfo(id: string): void {
    this.route.navigate([`user-traning-details/${id}/${this.pageUserId}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
