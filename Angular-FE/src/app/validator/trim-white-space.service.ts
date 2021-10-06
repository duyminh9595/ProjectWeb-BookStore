import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TrimWhiteSpaceService {
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.trim().length === 0) {
      // invalid, return error object
      return { notOnlyWhitespace: true };
    } else {
      // valid, return null
      return null;
    }
  }
}
