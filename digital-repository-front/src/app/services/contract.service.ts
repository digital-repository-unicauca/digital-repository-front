import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response} from 'src/app/class/response';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { Contract } from '../class/contract';
import { responseDocument } from '../class/models/responseDocument';
import { UpdateContract } from '../class/models/UpdateContract';
@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private urlAPI = 'http://localhost:8081/api/contract';
  private urlAPIModalityType = 'http://localhost:8081/api/modalityContractType';
  private urlAPIModality = 'http://localhost:8081/api/modality';
  private urlAPIContractType = 'http://localhost:8081/api/contractType';
  private cart = new BehaviorSubject<number>(1);

  cart$ = this.cart.asObservable();
  constructor(
    private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),

  };

  //service to return all contracts
  getAll(page:number, pageSize:number): Observable<Response>{

    return this.httpClient.get<Response>(`${this.urlAPI}/contractualFolders?pageNo=${page}&pageSize=${pageSize}` ).pipe(
      catchError((e) => {


        console.log('Error obteniendo todos los contratos', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }

  //service getallFiltered Contracts
  getAllFilteredContracts(page:number, pageSize:number,filter:string,search:string): Observable<Response>{

    return this.httpClient.get<Response>(`${this.urlAPI}/contractualFoldersFilterPattern?pageNo=${page}&pageSize=${pageSize}&filter=${filter}&search=${search}` ).pipe(
      catchError((e) => {


        console.log('Error obteniendo todos los contratos', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }


  //service to return a contract by id
  getContract(id:number): Observable<any>{
    return  this.httpClient.get<any>(this.urlAPI + "/" + id).pipe(
      catchError((e) => {
        console.log('Error obteniendo todos los contratos', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }

  getModalityContractType(type:number,modality:number): Observable<Response>{
    return this.httpClient.get<Response>(`${this.urlAPIModalityType}+?contractTypeId=${type}&modalityId=${modality}`).pipe(
      catchError((e) => {
        console.log('Error obteniendo todas las modalidades por tipo de contrato', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }


  getModalityType(): Observable<Response>{
    return this.httpClient.get<Response>(`${this.urlAPIModality}`).pipe(
      catchError((e) => {
        console.log('Error obteniendo todas las modalidades', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }


  getContractType(): Observable<Response>{
    return this.httpClient.get<Response>(`${this.urlAPIContractType}`).pipe(
      catchError((e) => {


        console.log('Error obteniendo todos los tipos de contrato', e.error.mensaje, 'error');
        return throwError(e);

      })
    )
  }
  
  async addContract(contract: Contract): Promise<boolean>{
    console.log("En addContracts, boton")
    var result = false;
    const body = JSON.stringify(contract);
    this.httpClient.post<boolean>(this.urlAPI, body, this.httpHeader).subscribe((response) => {
      result = response;
    });
    await new Promise(f => setTimeout(f, 1000));
    return result;
  }

   update(contract: UpdateContract): Observable<responseDocument> {
    const body = JSON.stringify(contract);
    console.log(body)
    return this.httpClient.patch<responseDocument>(this.urlAPI, body , this.httpHeader)
  }

  
  private selectedContractId: number | null = null;

  setSelectedContractId(contractId: number) {
    this.selectedContractId = contractId;
    this.cart.next(contractId);
  }

  getSelectedContractId(): number | null {
    return this.selectedContractId;
  }
}






































