import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { formatDate } from '@angular/common';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { ContractService } from 'src/app/shared/services/contract.service';
import { PlegableResponse } from 'src/app/modules/response/plegable-response';

export interface PeriodicElement {
  id: number;
  modality: string;
  contractType: string;
  signingDate: Date;
  reference: string;
  signingYear: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
 /* { id: 1, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
  { id: 2, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
  { id: 3, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
  { id: 4, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
  { id: 5, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
  { id: 6, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
  { id: 7, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },*/
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})


export class TableComponent implements OnInit {

  paginado: PlegableResponse[]=[]

  datos: PeriodicElement[]=[]
  ELEMENT_DATA: PeriodicElement[] = this.datos
  constructor(private paginatorIntl: MatPaginatorIntl, private service:ContractService) { }
  displayedColumns: string[] = ['select', 'id', 'modality', 'contractType', 'signingDate', 'reference', 'signingYear'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);


 /* async getContracts() {
    const response = await this.service.getAll().toPromise();
    if (response) {
      this.dataSource.data = response.data as PeriodicElement[];
    }
  }*/

  async getContrats(){
    (await this.service.getAll()).subscribe(arg => {this.paginado= arg.data;});
    
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
    this.paginatorIntl.nextPageLabel = 'Siguiente página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.firstPageLabel = 'Primera página';
    this.paginatorIntl.lastPageLabel = 'Última página';
    this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
      
    };
    this.getContrats;
    this.datos = this.paginado[0].data;
    this.dataSource.paginator = this.paginator;
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /** Format date for Year */
  formatSigningYear(year: Date): string {
    return year.getFullYear().toString();
  }

  /** Format date for signingDate */
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    return date.toLocaleString('en-US', options);
  }
}

