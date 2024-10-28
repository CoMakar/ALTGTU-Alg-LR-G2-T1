"use strict";

export function max(number_array) {
    if (number_array.length == 0) {
        return null;
    }

    let max_val = number_array[0];
    for (let val of number_array) {
        max_val = val > max_val ? val : max_val;
    }
    return max_val;
}

export function min(number_array) {
    if (number_array.length == 0) {
        return null;
    }

    let min_val = number_array[0];
    for (let val of number_array) {
        min_val = val < min_val ? val : min_val;
    }
    return min_val;
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
