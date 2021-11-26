export function wrapNullable<T>(field: T | undefined): any {
    if (field !== undefined) {
        return field;
    } else {
        return field || undefined;
    }
}
