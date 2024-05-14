import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { KitchenRoutingModule } from './kitchen-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './auth.guard';
@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    OrderComponent,
    MenuComponent,
  ],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    KitchenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class KitchenModule {}
