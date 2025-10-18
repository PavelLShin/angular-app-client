export interface IFreindsData {
  id: number;
  nickname: string | null;
  img: string | null;
}

export interface ISearchFriendsInterface {
  friendStatus: string;
  age: string;
  createdAt: string | null;
  gender: string | null;
  height: string | null;
  id: number | null;
  img: string | null;
  name: string | null;
  nickname: string | null;
  surname: string | null;
  updatedAt: string | null;
  userId: number | null;
  weight: string | null;
}

export interface IRequestIncoming {
  requestId: number;
  fromUserId: number;
  nickname: string;
  img: string;
}
