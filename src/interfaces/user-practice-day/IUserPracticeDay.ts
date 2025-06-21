export interface IUserPracticeDay {
  tittle: string;
  start: string;
  end: string;
  userExerciseDayId: string | null;
  duration: string;
  userProfileId: string | null;
}

export interface IUserPracticeDayData extends IUserPracticeDay {
  id: string;
}

export interface IUpdatePracticeDayData {
  id: string | null;
  end: string;
  duration: string;
}
