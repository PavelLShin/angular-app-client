export interface IExerciseType {
  id: number;
  tittle: string;
  updateAt: string;
}

export type ISetExerciseType = Pick<IExerciseType, 'tittle'>;

export interface IExerciseData {
  id: number | null;
  name: string | null;
  info: string | null;
  img: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  typeId: number | null;
}
