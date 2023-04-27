import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { BranchComponent } from './Branch.component';
import { FrontpageComponent } from './FrontPage/Frontpage.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingDetailsComponent } from './BookingDetails/BookingDetails.component';
import { CustomerDetailsComponent } from './CustomerDetails/Customer.component';
import { BookingUpdateComponent } from './BookingDetails/BookingUpdate.component';
import { ReportsComponent } from './Reports/Reports.component';
import { PaymentComponent } from './Payments/payment.component';
import { NgxPaginationModule } from 'ngx-pagination';

let routing = RouterModule.forChild([
  {
    path: "branch",
    component: BranchComponent,
    children: [ //template
      {path:"home",component:FrontpageComponent},
      {path:"bookingform",component:BookingFormComponent},
      {path:"bookingdetails",component:BookingDetailsComponent},
      {path:"customers",component:CustomerDetailsComponent},
      {path:"reports",component:ReportsComponent},
      {path:"payment",component:PaymentComponent},
      {path:"booking/:bookingId",component:BookingUpdateComponent},
      { path: "**", redirectTo: "home" },
    ],
  },
  { path: "**", redirectTo: "branch" },
]);

@NgModule({
  imports: [
    NgxPaginationModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    routing,
    FormsModule,
    MatSidenavModule,MatListModule,
  ],
  exports: [BranchComponent],
  declarations: [BranchComponent,FrontpageComponent ,BookingFormComponent,BookingDetailsComponent,
  CustomerDetailsComponent,BookingUpdateComponent,ReportsComponent,PaymentComponent],
  providers: [],
})
export class BranchModule { }
