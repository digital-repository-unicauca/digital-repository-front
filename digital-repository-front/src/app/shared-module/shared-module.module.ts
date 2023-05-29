import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContractComponent } from './components/list-contract/list-contract.component';
import { LucideAngularModule,Home,Search,Settings,FolderPlus,Check,X} from 'lucide-angular';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListContractComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    LucideAngularModule.pick({Home,Search,Settings,Check,X,FolderPlus}),
    ReactiveFormsModule,
  ],
  exports :[
    ListContractComponent
  ]
})
export class SharedModuleModule { }
