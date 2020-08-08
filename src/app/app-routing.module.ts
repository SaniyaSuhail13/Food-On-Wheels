import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import { UnAuthorizedAccessComponent } from "./shared/components/unauthorized-access/unauthorized-access.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./views/base/index/index.module").then((m) => m.IndexModule),
      },
      {
        path: "dishes",
        loadChildren: () =>
          import("./views/pages/product/dish.module").then(
            (m) => m.DishModule
          ),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./views/pages/user/user.module").then((m) => m.UserModule),
      }
    ],
  },
  { path: "no-access", component: UnAuthorizedAccessComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
