import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Collection } from 'src/app/class/collection';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private urlAPI = 'http://localhost:8081/api/collection';
  constructor(
    private http: HttpClient
  ) {

  }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),

  };

  createCollection(filas:any){
    const body:Collection = new Collection(1,1,true,"Miguel");


    return this.http.post<any>(this.urlAPI,body ,this.httpHeader).pipe(
      catchError((e) => {


        console.log('Error obteniendo todos los contratos', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }
}
