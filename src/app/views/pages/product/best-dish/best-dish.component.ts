import { TranslateService } from "src/app/shared/services/translate.service";
import { Component, OnInit } from "@angular/core";
import { Dish } from "src/app/shared/models/dish";
import { DishService } from "src/app/shared/services/dish.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-best-dish",
  templateUrl: "./best-dish.component.html",
  styleUrls: ["./best-dish.component.scss"],
})
export class BestDishComponent implements OnInit {
  bestDishes: Dish[] = [];
  options: any;
  loading = false;
  constructor(
    private dishService: DishService,
    private toasterService: ToastrService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.options = {
      dots: false,
      responsive: {
        0: { items: 1, margin: 5 },
        430: { items: 2, margin: 5 },
        550: { items: 3, margin: 5 },
        670: { items: 4, margin: 5 },
      },
      autoplay: true,
      loop: true,
      autoplayTimeout: 3000,
      lazyLoad: true,
    };
    this.getAllDishes();
  }

  getAllDishes() {
    this.loading = true;
    const x = this.dishService.getDishes();
    x.snapshotChanges()
      .pipe(map((dishes) => dishes.slice(0, 5)))
      .subscribe(
        (Dishes) => {
          this.loading = false;
          this.bestDishes = [];
          Dishes.forEach((element) => {
            const y = { ...element.payload.toJSON(), $key: element.key };
            this.bestDishes.push(y as Dish);
          });
        },
        (error) => {
          this.toasterService.error("Error while fetching Items", error);
        }
      );
  }
}
