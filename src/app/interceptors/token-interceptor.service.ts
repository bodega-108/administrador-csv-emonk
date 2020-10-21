import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private reqClone:any;
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem("token");
    if(token){
      const headers = new HttpHeaders({
        'token':token
      })
       this.reqClone = req.clone({
        headers
      });
    }
    
    
    return next.handle(this.reqClone);
  }

  

  
}
