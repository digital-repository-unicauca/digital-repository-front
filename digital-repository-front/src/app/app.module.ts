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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { LucideAngularModule, Home, Search, Settings, FolderPlus, Check, X, CalendarDays, ChevronRight, ChevronLeft, ScrollText, SlidersHorizontal } from 'lucide-angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { SettingSystemComponent } from './components/setting-system/setting-system.component';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { SideInformationComponent } from './components/side-information/side-information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from './modules/table/table.module';
import { LayoutComponent } from './components/layout/layout.component';
import { DialogComponent } from './componets/create-contract/dialog.component';

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
    DialogComponent 
  ],
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    IconModule,
    AppRoutingModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatDividerModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    MatTableModule,
    SharedModuleModule,
    MatDividerModule,
    MatListModule,
    LucideAngularModule.pick({ Home, Search, Settings, Check, X, FolderPlus, CalendarDays, ChevronRight, ScrollText, ChevronLeft, SlidersHorizontal }),
    BrowserAnimationsModule,
    MatTableModule,
    CommonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    IconSetService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
