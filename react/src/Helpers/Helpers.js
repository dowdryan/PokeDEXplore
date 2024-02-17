// Pokemon with hyphens
const exceptions = ['nidoran-m', 'nidoran-f', 'ho-oh',
'porygon-z', 'jangmo-o', 'hakamo-o', 'kommo-o',
'ting-lu', 'chien-pao', 'wo-chien', 'chi-yu'];

// Pokemon who dont have hyphens, but do in api
const additionalExceptions = ['mr-mime', 'mime-jr', 'type-null',
'tapu-koko', 'tapu-lele', 'tapu-bulu', 'tapu-fini', 'great-tusk', 'mr-rime',
'scream-tail', 'brute-bonnet', 'flutter-mane', 'slither-wing', 'sandy-shocks', 'iron-treads', 'iron-bundle',
'iron-hands', 'iron-jugulis', 'iron-moth', 'iron-thorns',
'roaring-moon', 'iron-valiant', 'walking-wake', 'gouging-fire',
'raging-bolt', 'iron-leaves', 'iron-boulder', 'iron-crown'
];


/**
 * Searches for the given typo in a string and replaces it with the corrected version.
 */
function fixTypo(string, typo, fixedString) {
    return string.replace(typo, fixedString);
}


/**
 *  
 */
function Capitalize(str) {
    if (typeof str !== 'string' || str === null) return ''; // Return an empty string if str is not a valid string
    return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
 *  
 */
function CapitalizeHyphen(word) {
    // Fixes "Paladox Pokemon" typo.
    if (word.includes("Paladox")) {
        return word.replace("Paladox", "Paradox");
    }
    return word
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('-');
}


/**
 *  
 */
function CapitalizeWordsRemoveHyphen(word) {
    return word
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}


/**
 *  
 */
function CapitalizePokemonWithHyphen(word) {
    if (word === 'nidoran-m') {
        const replacedWord = word.replace('m', '♂');
        return Capitalize(replacedWord)
    } else if (word === 'nidoran-f') {
        const replacedWord = word.replace('f', '♀');
        return Capitalize(replacedWord)
    }
    if (exceptions.includes(word.toLowerCase())) {
        return word
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('-'); // Preserve hyphen
    } 
    if (additionalExceptions.includes(word.toLowerCase())) {
        return word
            .split('-') 
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
    }
    if (word === 'farfetchd' || word === 'sirfetchd') {
        const wordWithApostrophe = word.slice(0, -1) + "'" + word.slice(-1);
        return Capitalize(wordWithApostrophe)
    }
    // Remove hyphen and the rest of the word
    return word.split('-')[0]
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}


export {
    Capitalize, 
    fixTypo,
    CapitalizeHyphen, 
    CapitalizeWordsRemoveHyphen, 
    CapitalizePokemonWithHyphen}