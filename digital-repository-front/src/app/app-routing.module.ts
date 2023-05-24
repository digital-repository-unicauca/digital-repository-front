import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './componets/home/home.component';
import { SearcContractsComponent } from './componets/searc-contracts/searc-contracts.component';
import { CreateContractComponent } from './componets/create-contract/create-contract.component';
import { SettingSystemComponent } from './componets/setting-system/setting-system.component';




const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'searchCont',component:SearcContractsComponent},
  {path:'createCont',component:CreateContractComponent},
  {path:'settingSyst',component:SettingSystemComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
