import { Component, OnInit } from "@angular/core";
import { Dish } from "../../../../shared/models/dish";
import { DishService } from "../../../../shared/services/dish.service";
@Component({
  selector: "app-favourite-dishes",
  templateUrl: "./liked-dishes.component.html",
  styleUrls: ["./liked-dishes.component.scss"],
})
export class FavouriteDishesComponent implements OnInit {
  favoruiteDishes: Dish[];
  showDataNotFound = true;

  // Not Found Message
  messageTitle = "No Favourite Dishes Found";
  messageDescription = "Please, choose your favourite Dishes";

  constructor(private dishService: DishService) { }

  ngOnInit() {
    this.getFavouritedish();
  }
  removeFavourite(dish: Dish) {
    this.dishService.removeLocalFavourite(dish);

    this.getFavouritedish();
  }

  getFavouritedish() {
    this.favoruiteDishes = this.dishService.getLocalFavouriteDishes();
  }
}
