import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DashboardSideMenuComponent } from './pages/dashboard-side-menu/dashboard-side-menu.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ItemsComponent } from './pages/items/items.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  }
  , {

    path: 'login',
    component: LoginComponent
  },{
  
  path: '',
  component: DashboardSideMenuComponent,
  children: [ {
    //Checkout
    path:'',
    component:CheckoutComponent
    },
    {
      path: 'items',
      component: ItemsComponent
    },
   

    {
      path: 'customers',
      component: CustomersComponent
    },
    {
      path: 'reports',
      component: ReportsComponent
    },
    {
      path: 'transactions',
      component: TransactionsComponent
    },
    {
      path: 'settings',
      component: SettingsComponent
    }

  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
