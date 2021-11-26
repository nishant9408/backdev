function setProps(props, base) {
    return Object.keys(props).reduce((acc, prop) => ({ ...acc, [prop]: base[prop] }), Object(null));
}

export function applyMixins<T>(instances: Array<Partial<T>>): T {
    return instances.reduce((acc, inst) => ({
        ...acc,
        ...setProps(Object.getOwnPropertyDescriptors(inst), inst),
        ...setProps(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(inst)), inst),
    }), Object(null)) as T;
}
