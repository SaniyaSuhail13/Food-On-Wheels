import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { Dish } from "../../../../shared/models/dish";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, OnChanges {
  @Input() Dishes: Dish[];

  totalValue = 0;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const dataChanges: SimpleChange = changes.Dishes;

    const Dishes: Dish[] = dataChanges.currentValue;
    this.totalValue = 0;
    Dishes.forEach((dish) => {
      this.totalValue += dish.dishPrice;
    });
  }

  ngOnInit() { }
}
