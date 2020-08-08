import { Component, OnInit } from "@angular/core";
import { Dish } from "../../../../shared/models/dish";
import { AuthService } from "../../../../shared/services/auth.service";
import { DishService } from "../../../../shared/services/dish.service";
import { ToastrService } from "../../../../shared/services/toastr.service";
@Component({
  selector: "app-dishes",
  templateUrl: "./dishes.component.html",
  styleUrls: ["./dishes.component.scss"],
})
export class DishesComponent implements OnInit {
  dishList: Dish[];
  loading = false;
  brands = ["All"];
  searchKeyword = "";

  selectedBrand: "All";

  page = 1;
  constructor(
    public authService: AuthService,
    private dishService: DishService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getAllDishes();
  }

  getAllDishes() {
    this.loading = true;
    const x = this.dishService.getDishes();
    x.snapshotChanges().subscribe(
      (dish) => {
        this.loading = false;
        this.dishList = [];
        dish.forEach((element) => {
          const y = { ...element.payload.toJSON(), $key: element.key };
          this.dishList.push(y as Dish);
          if (this.brands.indexOf((y as Dish).dishCategory) < 0) {
            this.brands.push((y as Dish).dishCategory);
          }
        });
      },
      (err) => {
        this.toastrService.error("Error while fetching dishes", err);
      }
    );
  }

  removeDish(key: string) {
    this.dishService.deleteDish(key);
  }

  addFavourite(dish: Dish) {
    this.dishService.addFavouriteDish(dish);
  }

  addToCart(dish: Dish) {
    this.dishService.addDishToCart(dish);
  }
}
