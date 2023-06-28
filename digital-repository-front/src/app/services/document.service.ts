import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fila } from '../class/models/Fila';
import { responseDocument } from '../class/models/responseDocument';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private urlAPI = 'http://localhost:8081/api/document';
  private urlChecklist =
    'http://localhost:8081/api/modalityContractType/check-list';

  constructor(private httpClient: HttpClient) {}

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public addDocuments(listdocument: Fila[]): Observable<responseDocument> {
    const body = JSON.stringify(listdocument);
    return this.httpClient.post<responseDocument>(
      this.urlAPI,
      body,
      this.httpHeader
    );
  }

  getCheckList(id: number): Observable<any> {
    return this.httpClient.get<any>(this.urlChecklist + '/' + id).pipe(
      catchError((e) => {
        console.log(
          'Error obteniendo toda la checkList',
          e.error.mensaje,
          'error'
        );
        return throwError(e);
      })
    );
  }
}
