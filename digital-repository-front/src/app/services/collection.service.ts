import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Collection } from 'src/app/class/collection';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { responseDocument } from '../class/models/responseDocument';
import { Fila } from '../class/models/Fila';
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

  createCollection(coll: Collection []):Observable<responseDocument> {
    const body=JSON.stringify(coll);
    return this.http.post<responseDocument>(this.urlAPI+'/all', body, this.httpHeader).pipe(
      catchError((e) => {
        console.log('Error obteniendo todos los contratos', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }

  getCollectionByContractAndContractualDocument(contractId: number, contractualDocumentId: number): Observable<any> {
    return this.http.get<any>(`${this.urlAPI}/${contractId}/${contractualDocumentId}`).pipe(
      catchError((e) => {


        console.log('Error obteniendo todos los contratos', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }
}
