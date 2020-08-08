import { Component, OnInit } from "@angular/core";
import { Dish } from "../../../../shared/models/dish";
import { DishService } from "../../../../shared/services/dish.service";
@Component({
  selector: "app-cart-dishes",
  templateUrl: "./cart-dishes.component.html",
  styleUrls: ["./cart-dishes.component.scss"],
})
export class CartDishesComponent implements OnInit {
  cartDishes: Dish[];
  showDataNotFound = true;

  // Not Found Message
  messageTitle = "No Items Found in Cart";
  messageDescription = "Please, Add Items to Cart";

  constructor(private dishService: DishService) { }

  ngOnInit() {
    this.getCartDish();
  }

  removeCartDish(dish: Dish) {
    this.dishService.removeLocalCartDish(dish);

    // Recalling
    this.getCartDish();
  }

  getCartDish() {
    this.cartDishes = this.dishService.getLocalCartDishes();
  }
}
