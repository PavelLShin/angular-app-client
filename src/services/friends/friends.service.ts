import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from 'src/env/constants';
import {
  IFreindsData,
  IRequestIncoming,
} from 'src/interfaces/user_data/IFriendsInterface';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private incomingRequestsUpdated = new BehaviorSubject<void | null>(null);
  public incomingRequestsUpdated$ = this.incomingRequestsUpdated.asObservable();

  constructor(private http: HttpClient) {}

  notifyIncomingRequestsUpdated(): void {
    this.incomingRequestsUpdated.next();
  }

  sendFriendsRequest(
    toUserId: number | null,
    fromUserId: number
  ): Observable<Object> {
    let data = {
      toUserId: toUserId,
      fromUserId: fromUserId,
    };
    return this.http.post(`${API_URL}/friends/sendFriendsRequest`, data);
  }

  getFriends(userId: number): Observable<IFreindsData[]> {
    return this.http.get<IFreindsData[]>(
      `${API_URL}/friends/getFriends/${userId}`
    );
  }

  removeFriends(
    currentUserId: number,
    friendId: number | null
  ): Observable<Object> {
    return this.http.delete(
      `${API_URL}/friends/removeFriend/${currentUserId}/${friendId}`
    );
  }

  checkFriendsRequest(
    toUserId: number,
    fromUserId: number | null
  ): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(
      `${API_URL}/friends/checkFriendsRequest/${toUserId}/${fromUserId}`
    );
  }

  getIncomingRequests(toUserId: number | null): Observable<IRequestIncoming[]> {
    return this.http.get<IRequestIncoming[]>(
      `${API_URL}/friends/getIncomingRequests/${toUserId}`
    );
  }

  respondToFriendRequest(
    requestId: number,
    action: string,
    currentUserId: number
  ): Observable<Object> {
    let data = {
      requestId,
      action,
      currentUserId,
    };
    return this.http.post(`${API_URL}/friends/respondToFriendRequest`, data);
  }
}
