import { DishService } from "../../../../../shared/services/dish.service";
import { Dish } from "../../../../../shared/models/dish";
import { BillingService } from "../../../../../shared/services/billing.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { User, UserDetail } from "../../../../../shared/models/user";
import { AuthService } from "../../../../../shared/services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { map } from "rxjs/operators";

@Component({
  selector: "app-billing-details",
  templateUrl: "./billing-details.component.html",
  styleUrls: ["./billing-details.component.scss"],
})
export class BillingDetailsComponent implements OnInit {
  userDetails: User;
  Dishes: Dish[];
  userDetail: UserDetail;

  constructor(
    public authService: AuthService,
    private billingService: BillingService,
    private dishService: DishService,
    private router: Router
  ) {
    /* Hiding Shipping Tab Element */
    document.getElementById("DishesTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "block";
    document.getElementById("resultTab").style.display = "none";

    this.userDetail = new UserDetail();
    this.Dishes = this.dishService.getLocalCartDishes();
    this.authService.userDetails$.subscribe((user) => {
      this.userDetails = user;
    });
  }

  ngOnInit() { }

  updateUserDetails(form: NgForm) {
    let totalPrice = 0;
    const Dishes = [];
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
      billingDate: Date.now(),
    };

    this.billingService.createBillings(data);

    this.router.navigate([
      "checkouts",
      { outlets: { checkOutlet: ["result"] } },
    ]);
  }
}
