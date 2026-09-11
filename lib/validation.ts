const VALID_TEXT_PATTERN = /^[A-Za-z][A-Za-z\s'.-]*$/;

export interface FieldValidationResult {
    isValid: boolean;
    error: string | null;
}

export function validateTextField(value: string, fieldLabel: string): FieldValidationResult {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
        return {isValid: false, error: `${fieldLabel} is required.` };
    }

    if (!VALID_TEXT_PATTERN.test(trimmed)) {
        return {
            isValid: false,
            error: `${fieldLabel} can only contain letters, spaces, and basic punctuation (no numbers or symbols).`,
        };
    }

    return { isValid: true, error: null };
}