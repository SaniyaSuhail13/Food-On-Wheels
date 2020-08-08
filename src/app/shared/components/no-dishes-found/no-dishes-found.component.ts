import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-no-dishes-found",
  templateUrl: "./no-dishes-found.component.html",
  styleUrls: ["./no-dishes-found.component.scss"],
})
export class NoDishesFoundComponent implements OnInit {
  @Input("title") title: string;
  @Input("description") description: string;
  constructor() { }

  ngOnInit() { }
}
