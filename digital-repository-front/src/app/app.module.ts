import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearcContractsComponent } from './components/searc-contracts/searc-contracts.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatListModule} from  '@angular/material/list' ;
import { FormsModule } from '@angular/forms';

import { SharedModuleModule } from './shared-module/shared-module.module';
//import icons
import { LucideAngularModule,Home,Search,Settings,FolderPlus,Check,X,CalendarDays,ChevronRight,ScrollText} from 'lucide-angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
//components
import { SettingSystemComponent } from './components/setting-system/setting-system.component';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { SideInformationComponent } from './components/side-information/side-information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from './modules/table/table.module';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearcContractsComponent,
    SidebarComponent,
    SettingSystemComponent,
    SideInformationComponent,
    CreateContractComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    IconModule,
    AppRoutingModule,HttpClientModule, MatSlideToggleModule,MatExpansionModule,
    MatDividerModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    MatTableModule,
    SharedModuleModule,
    MatDividerModule,MatListModule,
    LucideAngularModule.pick({Home,Search,Settings,Check,X,
      FolderPlus,CalendarDays,ChevronRight,ScrollText}), BrowserAnimationsModule,MatTableModule,CommonModule,
      MatCheckboxModule,
      MatPaginatorModule,
  ],
  providers: [IconSetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
