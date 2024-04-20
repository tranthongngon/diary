export const unique = (array) => {
 return [...new Set(array)];
}

export const uniqueArrayObject = (array, key) => {
 return [...new Map(array.map(item => [item[key], item])).values()];
}