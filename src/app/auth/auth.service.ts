import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { UserModel } from './user.model';

//response payload which is optional
export interface AuthResponseData{
  idToken	: string	;
  email	: string;	
  refreshToken	: string	;
  expiresIn	: string	;
  localId : string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer : any;
  constructor(private http: HttpClient, private router: Router) { }

  //this url is commmon for authentication which can get from firebase auth rest api sign up documentation
  //just need to replace [API_KEY] with your web api key which will presnt in project setting on firebase 
  signup(email: string, password:string){
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGzRxPFBT0hBKGMCf4jhyfdRm5MwDoxmA',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError), tap(resData=>{
      this.handleAuthentication(
        resData.email, resData.localId, resData.idToken, +resData.expiresIn
      );
    }
    ));
  }

  login(email: string, password:string){
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGzRxPFBT0hBKGMCf4jhyfdRm5MwDoxmA',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData=>{
      this.handleAuthentication(
        resData.email, resData.localId, resData.idToken, +resData.expiresIn
      );
    })
    );
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    }, expirationDuration);
  }

  autoLogin(){
    const userData:{
      email:string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } =JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new UserModel(userData.email, 
                                    userData.id, 
                                    userData._token, 
                                    new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
      //for calculation remaining time to expire token for current session
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private handleAuthentication(email:string, userId: string, token: string, expiresIn: number){
      const expirationDate = new Date(new Date().getTime() +  expiresIn * 1000);
      const user = new UserModel(email,userId, token, expirationDate  );
      this.user.next(user);  
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));//for storing data in local
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage ='An unknown error occured!';
        if(!errorRes.error.error || !errorRes.error.error){
          return throwError(errorMessage); 
        }
        switch(errorRes.error.error.message){
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already. Trying using with another!!'
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exists!'
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'The password is invalid or the user does not have a password.'
            break;
          case 'USER_DISABLED':
            errorMessage = 'The user account has been disabled by an administrator.'
            break;
            
        }
        return throwError(errorMessage);
  }
}
