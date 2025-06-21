import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IUserTraning } from 'src/interfaces/user-traning/user-traning';
import { UserTraningService } from 'src/services/user-traning/user-traning.service';

@Component({
  selector: 'app-start-user-traning',
  templateUrl: './start-user-traning.component.html',
  styleUrls: ['./start-user-traning.component.css'],
})
export class StartUserTraningComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  public loaderVisible: boolean = false;
  public bgColorNotification!: string;
  public errorMessage: string = '';
  public userId!: string | null;
  public userTranings!: IUserTraning[];
  public currentExerciseIndex: number = 0;

  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    private userTraningService: UserTraningService
  ) {}

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });

    this.getUserTraning(this.userId);
  }

  getUserTraning(userId: string | null): void {
    this.loaderVisible = true;
    this.userTraningService
      .getUserTraning(userId)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserTraning[];
        })
      )
      .subscribe({
        next: (data: IUserTraning[]) => {
          this.userTranings = data;
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  nextExercises(): void {
    if (this.currentExerciseIndex < this.userTranings.length - 1) {
      this.currentExerciseIndex =
        (this.currentExerciseIndex + 1) % this.userTranings.length;
    }
  }

  prevExercises(): void {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex =
        (this.currentExerciseIndex - 1 + this.userTranings.length) %
        this.userTranings.length;
    }
  }

  getCurrentUserTraning(id: number | null): void {
    this.route.navigate([`current-user-traning/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
