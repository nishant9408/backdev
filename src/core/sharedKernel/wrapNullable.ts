export function wrapNullable<T>(field: T | null | undefined): any {
    if (field !== undefined) return field;
    else return field || undefined;
}
