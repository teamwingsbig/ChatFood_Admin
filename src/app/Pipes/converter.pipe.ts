import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert'
})
export class ConverterPipe implements PipeTransform {

  transform(value: string, typ: string = 'EC' ): string {
    // EC for encode
    // DC for decode
    return typ === 'EC' ?  btoa(value) : atob(value);
  }

}
