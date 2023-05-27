import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response} from 'src/app/modules/response/response'; 
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
  //service to return all contracts
  async getAll(){
    return await this.httpClient.get<Response>(this.urlAPI + "/contract");
  }
  //service to return a contract by id
  async getContract(id:number){
    return await this.httpClient.get<Response>(this.urlAPI + "/contract/" + id);
  }
}