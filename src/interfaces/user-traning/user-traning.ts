import { IExerciseType } from '../exercise/IExerciseType';

export interface IUserTraning extends IExerciseType {
  createdAt: string;
  userProfileId: string | null;
}

export interface IDaysInMoth {}
