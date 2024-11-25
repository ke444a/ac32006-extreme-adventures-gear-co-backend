export const convertSnakeCaseToCamel = (item: object): object => {
    if (Array.isArray(item)) {
        return item.map(el => convertSnakeCaseToCamel(el));
    } else if (typeof item === "function" || item !== Object(item) || item instanceof Date) {
        return item;
    }
    return Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
            key.replace(/([-_][a-z])/gi, c => c.toUpperCase().replace(/[-_]/g, "")),
            convertSnakeCaseToCamel(value),
        ]),
    );
};
