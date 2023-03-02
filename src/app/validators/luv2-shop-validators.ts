import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {

    // whitespace validation
    static notOnlyWhitespace(control: FormControl): ValidationErrors {

        // check if only whitespace contained
        if ((control.value != null) && control.value.trim().length === 0) {

            // invalid, return error object
            return {'notOnlyWhitespace':true};
        }
        // check passed
        return null;
    }

}
