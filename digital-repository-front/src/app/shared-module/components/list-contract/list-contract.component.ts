
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { PeriodicElement } from 'src/app/models/PeriodicElement';
import { SelectionModel } from '@angular/cdk/collections';
import { ContractService } from 'src/app/shared/services/contract.service';
import { FormControl } from '@angular/forms';
//import { CdkColumnDef } from '@angular/cdk/table';

// const ELEMENT_DATA: PeriodicElement[] = [
//   { id: 1, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
//   { id: 2, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
//   { id: 3, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
//   { id: 4, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
//   { id: 5, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
//   { id: 6, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
//   { id: 7, modality: '+ 50 millones', contractType: 'Prestación de servicios', signingDate: new Date(), reference: 'xxx.yyy.zzz.4', signingYear: new Date() },
// ];

@Component({
  selector: 'app-list-contract',
  templateUrl: './list-contract.component.html',
  styleUrls: ['./list-contract.component.css']
})



export class ListContractComponent {

  contracts:PeriodicElement[]=[];
  displayedColumns: string[] = ['select','id', 'modality', 'contractType', 'reference', 'signingYear'];

  constructor(
    private paginatorIntl: MatPaginatorIntl,
    private  contractService:ContractService,

    ) {

    }
  //displayedColumns: string[] = ['select', 'id', 'modality', 'contractType', 'signingDate', 'reference', 'signingYear'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.contracts);
  //dataSource!: MatTableDataSource<PeriodicElement>;

  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //filterOptions = ['Fecha', 'Modalidad', 'Tipo de contrato'];
  filterOptions = ['REFERENCE', 'MODALITY', 'TYPE','VENDOR','SUPERSCRIBE-YEAR'];
  yearOptions = ["2021", "2022", "2023"];
  modalityOptions = ['Modalidad 1', 'Modalidad 2', 'Modalidad 3'];
  contractTypeOptions = ['Tipo 1', 'Tipo 2', 'Tipo 3'];
  referenceOptions =[]
  vendorOptions =[]
  // Control del primer select
  filterControl = new FormControl('');

  // Control del segundo select
  secondFilterControl = new FormControl('');
  pressedSettingsButton:boolean=false
  ngOnInit() {




    this.dataSource.paginator = this.paginator;
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
    this.paginatorIntl.nextPageLabel = 'Siguiente página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.firstPageLabel = 'Primera página';
    this.paginatorIntl.lastPageLabel = 'Última página';

    this.getAllContracts()

    this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
  }

  getAllContracts(){
    this.contractService.getAll(0,10).subscribe((response) => {
      console.log("Del servicio ",response)
      this.contracts = response.data.data as PeriodicElement[]
      // this.dataSource = new MatTableDataSource<PeriodicElement>(this.contracts);
      //this.dataSource = this.contracts
      console.log(this.contracts)
    })
  }
  getSecondFilterOptions() {
    const selectedFilter = this.filterControl.value;
    switch (selectedFilter) {
      case 'SUPERSCRIBE-YEAR':
        return this.yearOptions;
      case 'MODALITY':
        return this.modalityOptions;
      case 'TYPE':
        return this.contractTypeOptions;
      case 'VENDOR':
          return this.vendorOptions;
      case 'REFERENCE':
            return this.referenceOptions;
      default:
        return [];
    }
  }

  // Función para filtrar los datos según las opciones seleccionadas
  filterData() {
    let selectedFilter:string | null = "";
    let selectedValue :string | null   ="";
    selectedFilter = this.filterControl.value;
    selectedValue = this.secondFilterControl.value;

    if (selectedFilter == null || selectedValue ==null ||selectedFilter == "" || selectedValue =="" ) {
      selectedFilter = "SUPERSCRIBE-YEAR"; // Asignar el valor solo si no es null
      selectedValue = "2023"
    }
    // Aquí puedes realizar la llamada al servicio backend para obtener los datos filtrados
    console.log('Filtrar por:', selectedFilter);
    console.log('Valor seleccionado:', selectedValue);

    this.contractService.getAllFilteredContracts(0,10,selectedFilter,selectedValue).subscribe((response) => {
      console.log("Del servicio get all filtered  ",response)
      this.contracts = response.data.data as PeriodicElement[]
      // this.dataSource = new MatTableDataSource<PeriodicElement>(this.contracts);
      //this.dataSource = this.contracts

    })
  }
  toggleSettingButton(){
    this.pressedSettingsButton = !this.pressedSettingsButton
    console.log(this.pressedSettingsButton)
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['contracts'] && changes['contracts'].currentValue) {
      const updatedContracts = changes['contracts'].currentValue;

      if (updatedContracts.length > 0) {
        // Aquí puedes acceder a los datos actualizados en `updatedContracts`
        console.log('Contratos actualizados:', updatedContracts);

        // Inicializa MatTableDataSource con los datos actualizados
        this.dataSource = new MatTableDataSource<PeriodicElement>(updatedContracts);

        // Realiza cualquier acción necesaria con los datos en este punto
      }
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

    //return true
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
