import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByKeyword",
})
export class FilterByKeywordPipe implements PipeTransform {
  transform(items: any, search?: any): any {
    if (search && search !== "") {
      search = search.trim();
      search = search.replace(/  +/g, " ");
      return items.filter(
        (item: { dishName: any }) =>
          item.dishName.toLowerCase().indexOf(search.toLowerCase()) >= 0
      );
    } else {
      return items;
    }
  }
}
