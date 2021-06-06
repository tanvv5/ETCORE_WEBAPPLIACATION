import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DefaultComponent } from '../layouts/default/default.component';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component';
import { AuthenticationService } from 'src/app/services/authentication.service.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { AdminProductsComponent } from '../admin-products/admin-products.component';
import { AdminAuthGuard } from 'src/app/services/admin-auth-guard.service';
const routes: Routes = [
  {
    path: 'admin',
    component: DefaultComponent,
    children: [
      {
        path: 'dashboad',
        component: DashboardComponent,
      },
      // { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthenticationService, AdminAuthGuard] },
      { path: 'products/new', component: ProductFormComponent, canActivate: [AuthenticationService] },

      { path: 'products/:id', component: ProductFormComponent, canActivate: [AuthenticationService, AdminAuthGuard] },
      { path: 'products', component: AdminProductsComponent},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
