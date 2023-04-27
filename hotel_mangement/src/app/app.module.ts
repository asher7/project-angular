import { SignInComponent } from './SignIn/SignIn.component';
import { SignInModule } from './SignIn/SignIn.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { RouterModule ,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { ModelModule } from './Services/Model.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { BranchComponent } from './Branch/Branch.component';
import { BranchModule } from './Branch/Branch.module';



@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule ,SignInModule,ModelModule, MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,

    RouterModule.forRoot([

      {
        path:"signin",component:SignInComponent
      },

      {
        path:"main",
        loadChildren:()=> import('./Branch/Branch.module').then(m=>m.BranchModule)
      },
      {
        path:"**", redirectTo:"/signin"
      }

    ]),
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
