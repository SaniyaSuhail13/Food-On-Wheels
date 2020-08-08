import { Dish } from "../../../../shared/models/dish";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DishService } from "../../../../shared/services/dish.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
@Component({
  selector: "app-dish-detailed-information",
  templateUrl: "./dish-detailed-information.component.html",
  styleUrls: ["./dish-detailed-information.component.scss"],
})
export class DishDetailedInformationComponent implements OnInit, OnDestroy {
  private sub: any;
  dish: Dish;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private toastrService: ToastrService
  ) {
    this.dish = new Dish();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params.id; // (+) converts string 'id' to a number
      this.getdishDetail(id);
    });
  }

  getdishDetail(id: string) {
    const x = this.dishService.getDishById(id);
    x.snapshotChanges().subscribe(
      (dish) => {
        const y = { ...(dish.payload.toJSON() as Dish), $key: id };
        this.dish = y;
      },
      (error) => {
        this.toastrService.error("Error while fetching Item Detail", error);
      }
    );
  }

  addToCart(dish: Dish) {
    this.dishService.addDishToCart(dish);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
