import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componets/home/home.component';
import { SearcContractsComponent } from './componets/searc-contracts/searc-contracts.component';
import { SidebarComponent } from './componets/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';

//import icons
import { LucideAngularModule,Home,Search,Settings,FolderPlus} from 'lucide-angular';
import { SettingSystemComponent } from './componets/setting-system/setting-system.component';
import { CreateContractComponent } from './componets/create-contract/create-contract.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearcContractsComponent,
    SidebarComponent,
    SettingSystemComponent,
    CreateContractComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule, 
    LucideAngularModule.pick({Home,Search,Settings,
      FolderPlus})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
