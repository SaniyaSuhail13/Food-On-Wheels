import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Dish } from "../models/dish";
import { AuthService } from "./auth.service";
import { ToastrService } from "./toastr.service";

@Injectable()
export class DishService {
  dishes: AngularFireList<Dish>;
  dish: AngularFireObject<Dish>;

  favouriteDishes: AngularFireList<FavouriteDish>;
  cartDishes: AngularFireList<FavouriteDish>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  getDishes() {
    this.dishes = this.db.list("dishes");
    return this.dishes;
  }

  createDish(data: Dish, callback: () => void) {
    this.dishes.push(data);
    callback();
  }

  getDishById(key: string) {
    this.dish = this.db.object("dishes/" + key);
    return this.dish;
  }

  updateDish(data: Dish) {
    this.dishes.update(data.$key, data);
  }

  deleteDish(key: string) {
    this.dishes.remove(key);
  }

  async getUsersFavouriteDish() {
    const user = await this.authService.user$.toPromise();
    this.favouriteDishes = this.db.list("favouriteDishes", (ref) =>
      ref.orderByChild("userId").equalTo(user.$key)
    );
    return this.favouriteDishes;
  }

  addFavouriteDish(data: Dish): void {
    const a: Dish[] = JSON.parse(localStorage.getItem("favourite-dishes")) || [];
    a.push(data);
    this.toastrService.wait("Adding dish", "Adding dish as Favourite");
    setTimeout(() => {
      localStorage.setItem("favourite-dishes", JSON.stringify(a));
    }, 1500);
  }

  getLocalFavouriteDishes(): Dish[] {
    const dishes: Dish[] =
      JSON.parse(localStorage.getItem("favourite-dishes")) || [];

    return dishes;
  }

  removeFavourite(key: string) {
    this.favouriteDishes.remove(key);
  }

  removeLocalFavourite(dish: Dish) {
    const dishes: Dish[] = JSON.parse(localStorage.getItem("favourite-dishes"));

    for (let i = 0; i < dishes.length; i++) {
      if (dishes[i].dishId === dish.dishId) {
        dishes.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("favourite-dishes", JSON.stringify(dishes));
  }

  addDishToCart(data: Dish): void {
    const a: Dish[] = JSON.parse(localStorage.getItem("dishes")) || [];
    a.push(data);

    this.toastrService.wait(
      "Adding Item to Cart",
      "Item Adding to the cart"
    );
    setTimeout(() => {
      localStorage.setItem("dishes", JSON.stringify(a));
    }, 500);
  }

  removeLocalCartDish(dish: Dish) {
    const dishes: Dish[] = JSON.parse(localStorage.getItem("dishes"));

    for (let i = 0; i < dishes.length; i++) {
      if (dishes[i].dishId === dish.dishId) {
        dishes.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("dishes", JSON.stringify(dishes));
  }

  getLocalCartDishes(): Dish[] {
    const dishes: Dish[] =
      JSON.parse(localStorage.getItem("dishes")) || [];

    return dishes;
  }
}

export class FavouriteDish {
  dish: Dish;
  dishId: string;
  userId: string;
}
