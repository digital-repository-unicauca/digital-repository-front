import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableComponent } from './components/table/table.component';

import { LucideAngularModule,Home,Search,Settings,FolderPlus,Check,X} from 'lucide-angular';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    LucideAngularModule.pick({Home,Search,Settings,Check,X,
      FolderPlus})
  ],
  exports: [TableComponent],
})
export class TableModule { }


