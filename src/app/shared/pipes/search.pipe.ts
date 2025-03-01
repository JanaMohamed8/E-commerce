import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObject:any[] , searchName:string):any[] {
     return arrayOfObject.filter((item) => item.title.toLowerCase().includes(searchName.toLowerCase()));
  }

}
