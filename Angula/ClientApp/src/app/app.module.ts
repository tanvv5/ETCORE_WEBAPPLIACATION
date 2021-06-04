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
import { JwtModule } from "@auth0/angular-jwt";
import { EmptyCartComponent } from './shopping-cart/empty-cart/empty-cart.component';
import { CartLeftComponent } from './shopping-cart/cart-left/cart-left.component';
import { FooterComponent } from './footer/footer.component';
import { ShopsComponent } from './shops/shops.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SearchComponent } from './search/search.component';
import { SearchformComponent } from './search/searchform/searchform.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { AuthModule } from './admin/auth/auth.module';
import { DefaultComponent } from './admin/layouts/default/default.component';
import { AuthComponent } from './admin/layouts/auth/auth.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminloginComponent } from './admin/auth/adminlogin/adminlogin.component';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { AppSettings } from './_share/AppSettings';
export function tokenGetter() {
  return localStorage.getItem("token");
}
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
    , AdminOrdersComponent, ProductFormComponent, AdminProductsComponent, EmptyCartComponent, CartLeftComponent, FooterComponent, ShopsComponent,
    ProductDetailComponent, LeftSidebarComponent, CategoryComponent, CheckoutComponent, SearchComponent, SearchformComponent, AuthComponent
    , DefaultComponent, DashboardComponent, AdminloginComponent, ExponentialStrengthPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot([
      //{
      //  path: '',
      //  component: DefaultComponent,
      //  children: [
      //    {
      //      path: '',
      //      redirectTo: '/dashboad',
      //      pathMatch: 'full'
      //    },
      //    {
      //      path: 'dashboad',
      //      loadChildren: () =>
      //        import('./admin/dashboard/dashboard.module').then(m => m.DashboardModule)
      //    }
      //  ]
      //},
      {
        path: '',
        component: HomeComponent
      },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'vantan', component: VantanLearningAngularcomponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthenticationService, AdminAuthGuard] },
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthenticationService, AdminAuthGuard] },

      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthenticationService, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent},

      { path: 'card', component: ShoppingCartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'product-detail', component: ProductDetailComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'search', component: SearchComponent }
    ]),
    BrowserAnimationsModule,
    MatButtonModule,
    DashboardModule
  ],
  providers: [AppSettings],
  bootstrap: [AppComponent]
})
export class AppModule { }
