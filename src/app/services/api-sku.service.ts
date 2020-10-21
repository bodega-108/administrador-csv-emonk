import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
const httpOptions = {  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded' })};


@Injectable({
  providedIn: 'root'
})
export class ApiSkuService {

  private url;
  private urlcrear;
  
 

  constructor(private _http:HttpClient) {
    this.url = environment.apiSkus;
    this.urlcrear = environment.apiSku
   }
   

   getSkus():Observable<any>{
    
     return this._http.get(this.url);
     
   }
   public postSku(params):Observable<any>{
    return this._http.post(this.urlcrear, params)
   }

   deleteSku(termino){
     return this._http.get(this.urlcrear+`/buscar/${termino}`)
   }
}
