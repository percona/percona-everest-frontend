import z from 'zod';

const tooLongErrorMessage = (fieldName: string) => `The ${fieldName} name is too long\'`;

export const errorMessages = {
    tooLong: (value: string) => tooLongErrorMessage(value),
    doesNotEndWithDash: "The name shouldn't end with a hyphen.",
    doesNotStartWithDash:  "The name shouldn't start with a hyphen or a number.",
}

const doesNotContainerAnythingButAlphanumericAndDash = /^[a-z0-9-]+$/;
const doesNotStartWithDash = /^[^0-9-]/;
const doesNotEndWithDash = /[^-]$/;

// TODO split message for exceed number message and alphanumeric symbols
// TODO check messages with Catalina

export const rfc_123_schema = (fieldName: string, maxLength: number) => z.string().regex(
    doesNotContainerAnythingButAlphanumericAndDash,
    `The ${fieldName} name should not exceed ${maxLength} characters.`
)
    .regex(doesNotEndWithDash, errorMessages.doesNotEndWithDash)
    .regex(doesNotStartWithDash, errorMessages.doesNotStartWithDash)
    .trim();
