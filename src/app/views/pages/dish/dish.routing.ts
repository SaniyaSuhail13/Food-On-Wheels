import { IndexComponent } from "../../base/index/index.component";
import { CartDishesComponent } from "./cart-dishes/cart-dishes.component";
import { FavouriteDishesComponent } from "./liked-dishes/liked-dishes.component";
import { DishesComponent } from "./dishes/dishes.component";
import { Routes } from "@angular/router";

import { DishDetailedInformationComponent } from "./dish-detailed-information/dish-detailed-information.component";

export const dishRoutes: Routes = [
  {
    path: "Dishes",
    children: [
      {
        path: "",
        component: IndexComponent,
      },
      {
        path: "all-Dishes",
        component: DishesComponent,
      },
      {
        path: "favourite-Dishes",
        component: FavouriteDishesComponent,
      },
      {
        path: "cart-items",
        component: CartDishesComponent,
      },
      {
        path: "checkouts",
        loadChildren: () =>
          import("./checkout/checkout.module").then((m) => m.CheckoutModule),
      },
      {
        path: "dish/:id",
        component: DishDetailedInformationComponent,
      },
    ],
  },
];
