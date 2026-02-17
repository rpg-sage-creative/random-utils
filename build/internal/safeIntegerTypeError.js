export function safeIntegerTypeError(argKey, min, max, value) {
    const type = typeof (value);
    const message = `The "${argKey}" argument must be a safe integer between ${min} and ${max} (inclusive). `;
    const received = value === null ? `Received null`
        : value === undefined ? `Received undefined`
            : type === "string" ? `Received type string ('${value}')`
                : `Received type ${type} (${value})`;
    return new TypeError(message + received);
}
