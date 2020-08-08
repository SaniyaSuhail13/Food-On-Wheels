import { Dish } from "../../../../../shared/models/dish";
import { DishService } from "../../../../../shared/services/dish.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
declare var $: any;
@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})
export class ResultComponent implements OnInit {
  Dishes: Dish[];
  date: number;
  totalPrice = 0;
  tax = 6.4;

  constructor(private dishService: DishService) {
    /* Hiding Billing Tab Element */
    document.getElementById("DishesTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "block";

    this.Dishes = dishService.getLocalCartDishes();

    this.Dishes.forEach((dish) => {
      this.totalPrice += dish.dishPrice;
    });

    this.date = Date.now();
  }

  ngOnInit() { }

  downloadReceipt() {
    const data = document.getElementById("receipt");
    // console.log(data);

    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("reciept.pdf"); // Generated PDF
    });
  }
}
