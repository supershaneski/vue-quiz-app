/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * 
 * Reference: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function getToday() {
    return ((new Date()).toISOString()).split('T')[0]
}

// https://opentdb.com/api_config.php
export async function getRemoteData() {
    //https://opentdb.com/api.php?amount=10&type=multiple
    //https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple
    const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    return await response.json()
}