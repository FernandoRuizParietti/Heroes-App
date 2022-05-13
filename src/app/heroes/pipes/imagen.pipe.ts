import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(item: Heroe): string {
    if(!item.id && !item.alt_img){
      return 'assets/no-image.png'
    }else if(item.alt_img){
      return item.alt_img
    }else{
      return `assets/heroes/${item.id}.jpg`;
    }
  }

}
