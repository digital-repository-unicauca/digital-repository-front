import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response} from 'src/app/class/response';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private urlAPI = 'http://localhost:8081/api/contract';
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
  private selectedContractId: number | null = null;

  setSelectedContractId(contractId: number) {
    this.selectedContractId = contractId;
    this.cart.next(contractId);
  }

  getSelectedContractId(): number | null {
    return this.selectedContractId;
  }
}
