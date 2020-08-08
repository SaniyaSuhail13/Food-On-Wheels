import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoDishesFoundComponent } from "./components/no-Dishes-found/no-Dishes-found.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule, FormBuilder } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { OwlModule } from "ngx-owl-carousel";
import { NgxPaginationModule } from "ngx-pagination";
import { HttpClientModule } from "@angular/common/http";
import { UnAuthorizedAccessComponent } from "./components/unauthorized-access/unauthorized-access.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { FilterByBrandPipe } from "./pipes/filterByBrand.pipe";
import { DishService } from "./services/dish.service";
import { AdminGaurd } from "./guards/admin-gaurd";
import { AuthGuard } from "./guards/auth_gaurd";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { TranslatePipe } from "./pipes/translate.pipe";
import { NgxContentLoadingModule } from "ngx-content-loading";
import { MomentTimeAgoPipe } from "./pipes/moment-time-ago.pipe";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { FireBaseConfig } from "./../../environments/firebase.config";
import { FilterByKeywordPipe } from "./pipes/filterByKeyword.pipe";

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(FireBaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    OwlModule,
    NgxPaginationModule,
    NgxContentLoadingModule,
  ],
  declarations: [
    NoDishesFoundComponent,
    FilterByBrandPipe,
    FilterByKeywordPipe,
    UnAuthorizedAccessComponent,
    PageNotFoundComponent,
    TranslatePipe,
    MomentTimeAgoPipe,
  ],
  exports: [
    NoDishesFoundComponent,
    FormsModule,
    MDBBootstrapModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    RouterModule,
    OwlModule,
    NgxPaginationModule,
    FilterByBrandPipe,
    FilterByKeywordPipe,
    UnAuthorizedAccessComponent,
    PageNotFoundComponent,
    TranslatePipe,
    MomentTimeAgoPipe,
    NgxContentLoadingModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    ScrollingModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGaurd,
    DishService,
    UserService,
    FormBuilder,
  ],
})
export class SharedModule { }
