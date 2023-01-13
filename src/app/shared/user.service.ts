import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string=environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  constructor(private http:HttpClient) { }

  getUserInfoModel():Observable<any>{
    return this.http.get(this.baseUrl+"/formModel");

  }

 postUserInfo(registerForm:any):Observable<any>{
    return this.http.post(this.baseUrl+"/registerForm",registerForm);

  }

  getUserInfoRegister():Observable<any>{
    return this.http.get(this.baseUrl+"/registerForm");
  }

  updateUserInfoRegister(id: any, userInfo: any): Observable<any> {
    return this.http
      .put<any>(
        this.baseUrl + '/registerForm/' + id,
      userInfo
     
      )}
}
