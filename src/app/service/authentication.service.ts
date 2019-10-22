import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const headers = new HttpHeaders({'Content-Type': 'application/json'})
@Injectable()
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser = new Observable<User>();
    url = {
        signin: environment.apiUrl + 'blog/user/authenticate',
        register: environment.apiUrl + 'blog/user/register',
    };
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      if(this.currentUserSubject){
        this.currentUser = this.currentUserSubject.asObservable();
      }
        
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    login(user) {
        return this.http.get<any>(this.url.signin,{headers: headers, params: user}).pipe(map(data => {
            // login successful if there's a jwt token in the response
            if (data && data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.currentUserSubject.next(data);
            }

            return data;
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    register(user): Observable<any> {
        return this.http.post(this.url.register, user);
    }
}
