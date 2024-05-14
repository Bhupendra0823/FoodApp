import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { MenuComponent } from './menu/menu.component';
import { PreviewComponent } from './preview/preview.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { AuthGuard } from './customer.auth';

const routes: Routes = [
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'detail', component: DetailComponent},
  { path: 'preview', component: PreviewComponent, canActivate: [AuthGuard] },
  { path: 'thank-you', component: ThankYouComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
