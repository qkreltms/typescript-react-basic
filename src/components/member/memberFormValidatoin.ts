import {
    Validators, ValidationConstraints, createFormValidation
} from 'lc-form-validation'

const ValidationConstraints: ValidationConstraints = {
    fields: {
        login: [
            { validator: Validators.required },
            {
                validator: Validators.required,
                customParams: { length: 3 }
            }
        ]
    }
}

export const memberFormValidation = createFormValidation(ValidationConstraints)