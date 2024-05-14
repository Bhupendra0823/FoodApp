import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './customer.auth';

import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CustomerRoutingModule } from './customer-routing.module';

import { DetailComponent } from './detail/detail.component';
import { MenuComponent } from './menu/menu.component';
import { PreviewComponent } from './preview/preview.component';
import { ThankYouComponent } from './thank-you/thank-you.component';


@NgModule({
  declarations: [
    DetailComponent,
    MenuComponent,
    PreviewComponent,
    ThankYouComponent
  ],
  providers:[AuthGuard],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CustomerModule { }
