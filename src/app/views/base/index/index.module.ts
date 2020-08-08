import { SharedModule } from "./../../../shared/shared.module";

import { DishModule } from "../../pages/dish/dish.module";
// Core Dependencies
import { RouterModule } from "@angular/router";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IndexRoutes } from "./index.routing";

// Components
import { IndexComponent } from "./index.component";
import { LoginComponent } from "./login/login.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  imports: [
    CommonModule,
    DishModule,
    SharedModule,
    RouterModule.forChild(IndexRoutes),
  ],
  declarations: [
    IndexComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [HeaderComponent, FooterComponent],
  providers: [],
})
export class IndexModule { }
