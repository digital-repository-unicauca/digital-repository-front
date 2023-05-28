import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { formatDate } from '@angular/common';


export interface PeriodicElement {
  id: number;
  modality: string;
  contractType: string;
  signingDate: Date;
  reference: string;
  signingYear: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
  { id: 2, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
  { id: 3, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
  { id: 4, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
  { id: 5, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
  { id: 6, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
  { id: 7, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule],
})
export class TableComponent {
  displayedColumns: string[] = ['select', 'id', 'modality', 'contractType', 'signingDate', 'reference', 'signingYear'];
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

