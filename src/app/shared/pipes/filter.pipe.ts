import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hmFilter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], obj: any): any[] {
    if(value && value.length) {
      for(let v of value) {
        
      }
    }
    return null;
  }

}
