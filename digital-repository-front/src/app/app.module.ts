import { NgModule } from '@angular/core';
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
import {MatListModule} from  '@angular/material/list' ;


//import icons
import { LucideAngularModule,Home,Search,Settings,FolderPlus,Check,X} from 'lucide-angular';
//components
import { SettingSystemComponent } from './componets/setting-system/setting-system.component';
import { CreateContractComponent } from './componets/create-contract/create-contract.component';
import { SideInformationComponent } from './componets/side-information/side-information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from './modules/table/table.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearcContractsComponent,
    SidebarComponent,
    SettingSystemComponent,
    SideInformationComponent,
    CreateContractComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule, MatSlideToggleModule,MatExpansionModule,
    MatDividerModule,MatListModule,
    LucideAngularModule.pick({Home,Search,Settings,Check,X,
      FolderPlus}), BrowserAnimationsModule, TableModule,MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
