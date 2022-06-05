import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], args: string): any {
    if(!args){
      return value;
    }

    return value.filter(item =>  item.name.toLowerCase().includes(args.toLowerCase()))
  }

}
