export interface IUserExerciseDay {
  name?: string | null;
  dataArray?: IExerciseBySets[];
  dataPractice?: string;
  userTraningPracticeId?: string | null;
  exerciseId?: string | null;
}

export interface IGetUserExerciseDay {
  name: string | null;
  dataArray: string;
  dataPractice: string;
  userTraningPracticeId: string | null;
  exerciseId: string | null;
}

export interface IExerciseBySets {
  practice: string;
  weigth: string;
  dateExercise: string;
}
