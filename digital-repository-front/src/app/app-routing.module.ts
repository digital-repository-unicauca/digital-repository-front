import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SearcContractsComponent } from './components/searc-contracts/searc-contracts.component';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { SettingSystemComponent } from './components/setting-system/setting-system.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListContractComponent } from './shared-module/components/list-contract/list-contract.component';
import { EditContractComponent } from './components/edit-contract/edit-contract.component';



const routes: Routes = [
  // {path:'',component:HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'createCont', component: CreateContractComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'searchCont', component: SearcContractsComponent },
      { path: 'settingSyst', component: SettingSystemComponent },
      { path: 'listCont', component: ListContractComponent },
      { path: 'editCont', component: EditContractComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
  // {path:'searchCont',component:SearcContractsComponent},
  // {path:'createCont',component:CreateContractComponent},
  // {path:'settingSyst',component:SettingSystemComponent},
  // {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
