import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { formatDate } from '@angular/common';


export interface PeriodicElement {
  position: number;
  radicado: number;
  modalidad: string;
  tipoContrato: string;
  contratista: string;
  anioSus: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, radicado: 1231233, modalidad: 'virtual', tipoContrato: 'Prestación de servicios', contratista: 'Carlos Andrés', anioSus: new Date},
  {position: 2, radicado: 1231233, modalidad: 'virtual', tipoContrato: 'Prestación de servicios', contratista: 'Carlos Andrés', anioSus: new Date},
  {position: 3, radicado: 1231233, modalidad: 'virtual', tipoContrato: 'Prestación de servicios', contratista: 'Carlos Andrés', anioSus: new Date},
  {position: 4, radicado: 1231233, modalidad: 'virtual', tipoContrato: 'Prestación de servicios', contratista: 'Carlos Andrés', anioSus: new Date},
  {position: 5, radicado: 1231233, modalidad: 'virtual', tipoContrato: 'Prestación de servicios', contratista: 'Carlos Andrés', anioSus: new Date},
  {position: 6, radicado: 1231233, modalidad: 'virtual', tipoContrato: 'Prestación de servicios', contratista: 'Carlos Andrés', anioSus: new Date},
  {position: 7, radicado: 1231233, modalidad: 'virtual', tipoContrato: 'Prestación de servicios', contratista: 'Carlos Andrés', anioSus: new Date}
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule],
})
export class TableComponent{
  displayedColumns: string[] = ['select', 'position', 'radicado', 'modalidad', 'tipoContrato', 'contratista', 'anioSus'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

}
