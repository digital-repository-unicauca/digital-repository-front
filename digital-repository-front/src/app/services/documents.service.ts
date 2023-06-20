import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fila } from '../class/models/Fila';
import { responseDocument } from '../class/models/responseDocument';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private urlAPI = 'http://localhost:8081/api/document';

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
}
