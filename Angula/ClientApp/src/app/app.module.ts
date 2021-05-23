import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VantanLearningAngularcomponent } from './vantan/VantanLearningAngular.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './_share/alert.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthenticationService } from './services/authentication.service.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VantanLearningAngularcomponent
    , JwPaginationComponent, LoginComponent
    , AlertComponent, RegisterComponent, PageNotFoundComponentComponent, ProductCardComponent, ShoppingCartComponent
    , AdminOrdersComponent, ProductFormComponent, AdminProductsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'vantan', component: VantanLearningAngularcomponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthenticationService, AdminAuthGuard]},
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthenticationService,AdminAuthGuard]},

      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthenticationService,AdminAuthGuard]},
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthenticationService,AdminAuthGuard]}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
