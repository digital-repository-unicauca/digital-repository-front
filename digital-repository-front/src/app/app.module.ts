import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componets/home/home.component';
import { SearcContractsComponent } from './componets/searc-contracts/searc-contracts.component';
import { SidebarComponent } from './componets/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatListModule} from  '@angular/material/list' ;

//import icons
import { LucideAngularModule,Home,Search,Settings,FolderPlus,Check,X} from 'lucide-angular';
//components
import { SettingSystemComponent } from './componets/setting-system/setting-system.component';
import { CreateContractComponent } from './componets/create-contract/create-contract.component';
import { SideInformationComponent } from './componets/side-information/side-information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './modules/table/components/table/table.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearcContractsComponent,
    SidebarComponent,
    SettingSystemComponent,
    SideInformationComponent,
    CreateContractComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule, MatSlideToggleModule,MatExpansionModule,
    MatDividerModule,MatListModule,MatDividerModule,
    LucideAngularModule.pick({Home,Search,Settings,Check,X,
      FolderPlus}), BrowserAnimationsModule,MatTableModule,CommonModule,
      MatCheckboxModule,
      MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
