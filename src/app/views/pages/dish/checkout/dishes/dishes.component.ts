import { DishService } from "../../../../../shared/services/dish.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Dish } from "../../../../../shared/models/dish";

@Component({
  selector: "app-dishes",
  templateUrl: "./dishes.component.html",
  styleUrls: ["./dishes.component.scss"],
})
export class DishesComponent implements OnInit {
  checkoutDishes: Dish[];

  totalPrice = 0;
  constructor(dishService: DishService) {
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "none";

    const Dishes = dishService.getLocalCartDishes();

    this.checkoutDishes = Dishes;

    Dishes.forEach((dish) => {
      this.totalPrice += dish.dishPrice;
    });
  }

  ngOnInit() { }
}
