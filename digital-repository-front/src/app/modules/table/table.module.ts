import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule, MatTableModule, TableComponent
  ],
  exports: [ TableComponent ],
})
export class TableModule { }
