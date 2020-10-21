import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
const httpOptions = {  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded' })};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public urlUser: string;
  public headers: any;
  constructor(private _http:HttpClient) { 
    this.urlUser= environment.apiUser;
    
   
  }
  
  getSesion(){
  
    return this._http.get(this.urlUser+'/sesion');
  }
  getLogin(params):Observable<any>{

 
    return this._http.post(this.urlUser+'/login',params);
  }
  postUsurio(params){
    return this._http.post(this.urlUser+'/emonkuser',params);
  }
}
