import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DishService } from "src/app/shared/services/dish.service";
import { Dish } from "src/app/shared/models/dish";

declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require("shortid");
const moment = require("moment");

@Component({
  selector: "app-add-dish",
  templateUrl: "./add-dish.component.html",
  styleUrls: ["./add-dish.component.scss"],
})
export class AddDishComponent implements OnInit {
  dish: Dish = new Dish();
  constructor(private dishService: DishService) { }

  ngOnInit() { }

  createDish(dishForm: NgForm) {
    const payload: Dish = {
      ...dishForm.value,
      dishId: "PROD_" + shortId.generate(),
      dishAdded: moment().unix(),
      ratings: Math.floor(Math.random() * 5 + 1),
      favourite: false,
    };

    if (dishForm.value.dishImageUrl === undefined) {
      payload.dishImageUrl =
        "http://via.placeholder.com/640x360/007bff/ffffff";
    }

    this.dishService.createDish(payload, () => {
      this.dish = new Dish();
      $("#exampleModalLong").modal("hide");
      toastr.success(
        "Item " + payload.dishName + "is added successfully",
        "Dish Creation"
      );
    });
  }
}
