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

<<<<<<< HEAD
import { SharedModuleModule } from './shared-module/shared-module.module';
=======
>>>>>>> b942d874064ec77ce254122d2dce3ab298a1f130
//import icons
import { LucideAngularModule,Home,Search,Settings,FolderPlus,Check,X} from 'lucide-angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
//components
import { SettingSystemComponent } from './components/setting-system/setting-system.component';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { SideInformationComponent } from './components/side-information/side-information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { TableModule } from './modules/table/table.module';
import { LayoutComponent } from './components/layout/layout.component';
=======
import { TableComponent } from './modules/table/components/table/table.component';
>>>>>>> b942d874064ec77ce254122d2dce3ab298a1f130


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearcContractsComponent,
    SidebarComponent,
    SettingSystemComponent,
    SideInformationComponent,
    CreateContractComponent,
<<<<<<< HEAD
    LayoutComponent,
=======
    TableComponent,
>>>>>>> b942d874064ec77ce254122d2dce3ab298a1f130
  ],
  imports: [
    BrowserModule,
    IconModule,
    AppRoutingModule,HttpClientModule, MatSlideToggleModule,MatExpansionModule,
<<<<<<< HEAD
    MatDividerModule,
    LucideAngularModule.pick({Home,Search,Settings,Check,X,FolderPlus}),

    BrowserAnimationsModule,
    TableModule,
    MatTableModule,
    SharedModuleModule,
    MatDividerModule,MatListModule,
=======
    MatDividerModule,MatListModule,MatDividerModule,
>>>>>>> b942d874064ec77ce254122d2dce3ab298a1f130
    LucideAngularModule.pick({Home,Search,Settings,Check,X,
      FolderPlus}), BrowserAnimationsModule,MatTableModule,CommonModule,
      MatCheckboxModule,
      MatPaginatorModule,
  ],
  providers: [IconSetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
