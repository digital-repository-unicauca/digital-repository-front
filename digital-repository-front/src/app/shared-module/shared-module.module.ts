import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContractComponent } from './components/list-contract/list-contract.component';
import { LucideAngularModule,Home,Search,Settings,FolderPlus,Check,X} from 'lucide-angular';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginadorComponent } from './components/paginador/paginador.component';

import {
  ButtonModule,
  DropdownModule,
  ButtonGroupModule ,
  PaginationModule,
  TableModule,
  UtilitiesModule
}from '@coreui/angular'

@NgModule({
  declarations: [
    ListContractComponent,
    PaginadorComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    LucideAngularModule.pick({Home,Search,Settings,Check,X,FolderPlus}),
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    PaginationModule,
    ReactiveFormsModule,
    TableModule,
    UtilitiesModule 
  ],
  exports :[
    ListContractComponent,
    PaginadorComponent
  ]
})
export class SharedModuleModule { }
