import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-dish",
  template: ` <p>
    dish works!
  </p>`,
  styleUrls: [],
})
export class DishComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() { }
}
