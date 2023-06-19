import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilaService {
  private filas: any[] = [];
  private filasSubject: Subject<any[]> = new Subject<any[]>();

  constructor() { }

  agregarFila(fila: any) {
    this.filas.push(fila);
    this.emitirFilas();
  }

  obtenerFilas(): Observable<any[]> {
    return this.filasSubject.asObservable();
  }

  private emitirFilas() {
    this.filasSubject.next([...this.filas]); 
  }
}

