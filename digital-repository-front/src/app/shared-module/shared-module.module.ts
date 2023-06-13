import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListContractComponent } from './components/list-contract/list-contract.component';
import { LucideAngularModule,Home,Search,Settings,FolderPlus,Check,X} from 'lucide-angular';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginadorComponent } from './components/paginador/paginador.component';

import {
  ButtonModule,
  DropdownModule,
  ButtonGroupModule ,
  CollapseModule ,
  CalloutModule ,
  GridModule,
  NavbarModule,
  NavModule ,
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
    CollapseModule,
    CalloutModule ,
    DropdownModule,
    FormsModule,
    GridModule,RouterModule,
    LucideAngularModule.pick({Home,Search,Settings,Check,X,FolderPlus}),
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    NavbarModule,
    NavModule ,
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
