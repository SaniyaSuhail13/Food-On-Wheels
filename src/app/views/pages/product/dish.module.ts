import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { dishRoutes } from "./dish.routing";

import { CheckoutModule } from "./checkout/checkout.module";

import { DishComponent } from "./dish.component";
import { BestDishComponent } from "./best-dish/best-dish.component";
import { DishesComponent } from "./dishes/dishes.component";
import { AddDishComponent } from "./add-dish/add-dish.component";
import { DishDetailedInformationComponent } from "./dish-detailed-information/dish-detailed-information.component";
import { SharedModule } from "../../../shared/shared.module";
import { FavouriteDishesComponent } from "./liked-dishes/liked-dishes.component";
import { CartDishesComponent } from "./cart-dishes/cart-dishes.component";
import { CartComponent } from "./cart/cart.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dishRoutes),
    SharedModule,
    CheckoutModule,
  ],
  declarations: [
    DishComponent,
    BestDishComponent,
    DishesComponent,
    AddDishComponent,
    DishDetailedInformationComponent,
    FavouriteDishesComponent,
    CartComponent,
    CartDishesComponent
  ],
  exports: [BestDishComponent],
})
export class DishModule { }
