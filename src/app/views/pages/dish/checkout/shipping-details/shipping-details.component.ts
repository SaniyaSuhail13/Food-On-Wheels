import { Dish } from "../../../../../shared/models/dish";
import { ShippingService } from "../../../../../shared/services/shipping.service";
import { UserDetail, User } from "../../../../../shared/models/user";
import { AuthService } from "../../../../../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { DishService } from "../../../../../shared/services/dish.service";
import { map } from "rxjs/operators";
@Component({
  selector: "app-shipping-details",
  templateUrl: "./shipping-details.component.html",
  styleUrls: ["./shipping-details.component.scss"],
})
export class ShippingDetailsComponent implements OnInit {
  userDetails: User;

  userDetail: UserDetail;

  Dishes: Dish[];

  constructor(
    public authService: AuthService,
    private shippingService: ShippingService,
    dishService: DishService,
    private router: Router
  ) {
    /* Hiding Dishes Element */
    document.getElementById("DishesTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "block";
    document.getElementById("DishesTab").style.display = "none";
    document.getElementById("resultTab").style.display = "none";

    this.userDetail = new UserDetail();
    this.Dishes = dishService.getLocalCartDishes();
    this.authService.userDetails$.subscribe((user) => {
      this.userDetails = user;
    });
  }

  ngOnInit() { }

  updateUserDetails(form: NgForm) {
    const Dishes = [];
    let totalPrice = 0;
    this.Dishes.forEach((dish) => {
      delete dish.$key;
      totalPrice += dish.dishPrice;
      Dishes.push(dish);
    });
    const data = {
      ...form.value,
      emailId: this.userDetails.emailId,
      userId: this.userDetails.$key,
      Dishes,
      totalPrice,
      shippingDate: Date.now(),
    };

    this.shippingService.createshippings(data);

    this.router.navigate([
      "checkouts",
      { outlets: { checkOutlet: ["billing-details"] } },
    ]);
  }
}
