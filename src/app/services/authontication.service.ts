import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthonticationService {

  private currentUserSubject = new BehaviorSubject<User>(null);
  public currentUser: Observable<User>;
  constructor() {

  }

  public initUser(user)
   {
        this.currentUserSubject.next(user);
        this.currentUser = this.currentUserSubject.asObservable();
   }
  

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  hasPermission(roles: any): boolean | Observable<boolean> {
    //TODO this.objects.filter( a => a.color === object.color )
    return roles.filter(a => a == this.currentUserSubject.getValue().status).length > 0;
  }


}
