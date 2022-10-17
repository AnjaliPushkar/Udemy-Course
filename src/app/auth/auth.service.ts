import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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

  constructor(private http: HttpClient) { }

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
    ).pipe(catchError(this.handleError));
  }

  login(email: string, password:string){
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGzRxPFBT0hBKGMCf4jhyfdRm5MwDoxmA',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleError));
    
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
