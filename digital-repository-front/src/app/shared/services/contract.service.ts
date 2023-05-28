import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from 'src/app/modules/response/response'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private urlAPI = 'http://localhost:8081/api';

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  // Service para obtener todos los contratos
  getAll(): Observable<Response> {
    return this.httpClient.get<Response>(`${this.urlAPI}/contract/contractualFolders?pageNo=1&pageSize=10`);
  }

  // Service para obtener un contrato por su ID
  getContract(id: number): Observable<Response> {
    return this.httpClient.get<Response>(`${this.urlAPI}/contract/${id}`);
  }
}