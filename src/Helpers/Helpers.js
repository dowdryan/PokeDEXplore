const exceptions = ['nidoran-m', 'nidoran-f', 'ho-oh',
'porygon-z', 'jangmo-o', 'hakamo-o', 'kommo-o',
'ting-lu', 'chien-pao', 'wo-chien', 'chi-yu'];

const additionalExceptions = ['mr-mime', 'mime-jr', 'type-null',
'tapu-koko', 'tapu-lele', 'tapu-bulu', 'tapu-fini', 'great-tusk', 'mr-rime',
'slither-wing', 'sandy-shocks', 'iron-treads', 'iron-bundle',
'iron-hands', 'iron-jugulis', 'iron-moth', 'iron-thorns',
'roaring-moon', 'iron-valiant', 'walking-wake', 'gouging-fire',
'raging-bolt', 'iron-leaves', 'iron-boulder', 'iron-crown'
];

function Capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

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

function CapitalizeWordsRemoveHyphen(word) {
    return word
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

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

export default {Capitalize, CapitalizeHyphen, CapitalizeWordsRemoveHyphen, CapitalizePokemonWithHyphen}