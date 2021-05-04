import { AddCustomerComponent } from './secondaryPages/add-customer/add-customer.component';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{AngularFireDatabaseModule} from '@angular/fire/database'
import { AngularFireModule } from '@angular/fire';
import{AngularFireAuthModule} from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
// import { IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from 'angular-onscreen-material-keyboard';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRippleModule} from '@angular/material/core';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import{MatDialogModule} from '@angular/material/dialog'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule, } from '@angular/material/table'
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';

import { NgxElectronModule } from 'ngx-electron';

import { KeyboardShortcutsModule }     from 'ng-keyboard-shortcuts';  

import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardSideMenuComponent } from './pages/dashboard-side-menu/dashboard-side-menu.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemsComponent } from './pages/items/items.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AddItemOptionComponent } from './secondaryPages/add-item-option/add-item-option.component';
import { AddSingleItemComponent } from './secondaryPages/add-single-item/add-single-item.component';
import { AddItemsBulkComponent } from './secondaryPages/add-items-bulk/add-items-bulk.component';
import { AddItemsCategoryComponent } from './secondaryPages/add-items-category/add-items-category.component';
import { ListCustomerComponent } from './secondaryPages/list-customer/list-customer.component';
import { AddDiscountComponent } from './secondaryPages/add-discount/add-discount.component';
import { EditItemsComponent } from './secondaryPages/edit-items/edit-items.component';
import { EditCategoryComponent } from './secondaryPages/edit-category/edit-category.component';
import { FilterPipe } from './filter.pipe';
import { EditCustomerComponent } from './secondaryPages/edit-customer/edit-customer.component';
import { AddCheckoutComponent } from './secondaryPages/add-checkout/add-checkout.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CheckOutItemComponent } from './secondaryPages/check-out-item/check-out-item.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AddTaxesComponent } from './secondaryPages/add-taxes/add-taxes.component';
import { AddPaymentComponent } from './secondaryPages/add-payment/add-payment.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { DisplayCheckoutComponent } from './secondaryPages/display-checkout/display-checkout.component';
import { AcceptTransactionComponent } from './secondaryPages/accept-transaction/accept-transaction.component';
import {MatNativeDateModule} from '@angular/material/core';
import { EditTaxComponent } from './secondaryPages/edit-tax/edit-tax.component';
import { EditPayComponent } from './secondaryPages/edit-pay/edit-pay.component';
import { SearchItemComponent } from './secondaryPages/search-item/search-item.component';
import { ExpieredComponent } from './secondaryPages/expiered/expiered.component';
import { BagNotificationComponent } from './secondaryPages/bag-notification/bag-notification.component';
import { AddInventoryComponent } from './secondaryPages/add-inventory/add-inventory.component';
import { SupportComponent } from './secondaryPages/support/support.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';








export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


// const customLayouts: IKeyboardLayouts = {
//   ...keyboardLayouts,
//   'oh': {
//     'name': 'Awesome layout',
//     'keys': [
//       [
//         ['1', '!'],
//         ['2', '@'],
//         ['3', '#']
//       ]
//     ],
//     'lang': ['de-CH']
//   }
// };

@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    DashboardSideMenuComponent,
    CheckoutComponent,
    RegisterComponent,
    ItemsComponent,
    ReportsComponent,
    CustomersComponent,
    TransactionsComponent,
    SettingsComponent,
    AddItemOptionComponent,
    AddSingleItemComponent,
    AddItemsBulkComponent,
    AddItemsCategoryComponent,
    ListCustomerComponent,
    LoginComponent,
    AddDiscountComponent,
    EditItemsComponent,
    EditCategoryComponent,
    FilterPipe,
    EditCustomerComponent,
    AddCheckoutComponent,
    CheckOutItemComponent,
    AddTaxesComponent,
    AddPaymentComponent,
    DisplayCheckoutComponent,
    AcceptTransactionComponent,
    EditTaxComponent,
    EditPayComponent,
    SearchItemComponent,
    ExpieredComponent,
    BagNotificationComponent,
    AddInventoryComponent,
    SupportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    KeyboardShortcutsModule.forRoot()  ,

    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        

          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  }),
    NgxElectronModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    FormsModule,
    MatRadioModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatBadgeModule,
    MatInputModule,
    MatSlideToggleModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatRippleModule,
    MatSelectModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatTabsModule,
    AutocompleteLibModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule

  ],
  providers: [
    // { provide: MAT_KEYBOARD_LAYOUTS, useValue: customLayouts }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
