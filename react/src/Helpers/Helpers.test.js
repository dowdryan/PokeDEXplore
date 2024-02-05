// import { Capitalize, 
//          CapitalizeHyphen, 
//          CapitalizeWordsRemoveHyphen, 
//          CapitalizePokemonWithHyphen 
//         } from './Helpers.js';

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


describe('Capitalize', () => {
    test('Handles empty strings', () => {
        const result = Capitalize('');
        expect(result).toBe('');
    });
    test("Capitalize a word", () => {
        const result = Capitalize('hello');
        expect(result).toBe('Hello');
    });
    test("Capitalize a Pokemon's name", () => {
        const result = Capitalize('pikachu');
        expect(result).toBe('Pikachu');
    });
});


describe('CapitalizeHyphen', () => {
    test('Handles empty strings', () => {
        const result = CapitalizeHyphen('');
        expect(result).toBe('');
    });
    test("Capitalize a string without a hyphen", () => {
        const result = CapitalizeHyphen('Hello');
        expect(result).toBe('Hello');
    });
    test("Capitalize both words", () => {
        const result = CapitalizeHyphen('hello-world');
        expect(result).toBe('Hello-World');
    })
    test("Capitalize all words before and after hyphens", () => {
        const result = CapitalizeHyphen('hello-there-world');
        expect(result).toBe('Hello-There-World');
    })
})

describe('CapitalizeWordsRemoveHyphen', () => {
    test('Handles empty strings', () => {
        const result = CapitalizeWordsRemoveHyphen('');
        expect(result).toBe('');
    });
    test("Capitalize a string without a hyphen", () => {
        const result = CapitalizeWordsRemoveHyphen('Hello');
        expect(result).toBe('Hello');
    });
    test("Capitalize both words", () => {
        const result = CapitalizeWordsRemoveHyphen('hello-world');
        expect(result).toBe('Hello World');
    })
    test("Capitalize all words before and after hyphens", () => {
        const result = CapitalizeWordsRemoveHyphen('hello-there-world');
        expect(result).toBe('Hello There World');
    })
})

describe('CapitalizePokemonWithHyphen', () => {
    test('Handles empty strings', () => {
        const result = CapitalizePokemonWithHyphen('');
        expect(result).toBe('');
    });
    test("Capitalize a Pokemon's name without a hyphen", () => {
        const result = CapitalizePokemonWithHyphen('pikachu');
        expect(result).toBe('Pikachu');
    });
    test('Handles Male/Female Nidoran Logic', () => {
        const resultMale = CapitalizePokemonWithHyphen('nidoran-m');
        const resultFemale = CapitalizePokemonWithHyphen('nidoran-f');
        expect(resultMale).toBe('Nidoran-♂');
        expect(resultFemale).toBe('Nidoran-♀');
    });
    test('preserve hyphens and capitalize Pokemon names in exceptions array', () => {
        exceptions.forEach((pokemon) => {
            const result = CapitalizePokemonWithHyphen(pokemon);
            const parts = result.split('-');
            parts.forEach((part) => {
                const firstChar = part.charAt(0);
                expect(firstChar).toEqual(firstChar.toUpperCase());
            });
            expect(result).toContain('-');
        });
    });
    test("Capitalizes Pokemon's name, replaces hyphen with a space", () => {
        additionalExceptions.forEach((pokemon) => {
            const result = CapitalizePokemonWithHyphen(pokemon);
            const parts = result.split(' ');
            parts.forEach((part) => {
                const firstChar = part.charAt(0);
                expect(firstChar).toEqual(firstChar.toUpperCase());
            });
            expect(result).not.toContain('-');
        });
    });
    test("Handles Farfetch'd/Sirfetch'd Logic", () => {
        const farfetchdResult = CapitalizePokemonWithHyphen('farfetchd');
        const sirfetchdResult = CapitalizePokemonWithHyphen('sirfetchd');

        expect(farfetchdResult).toBe('Farfetch\'d');
        expect(sirfetchdResult).toBe('Sirfetch\'d');
    });
    test('Handles Form Logic', () => {
        const originalPokemon = 'shaymin-sky';
        const result = CapitalizePokemonWithHyphen(originalPokemon);
        const parts = result.split(' ');
        parts.forEach((part) => {
            const firstChar = part.charAt(0);
            expect(firstChar).toEqual(firstChar.toUpperCase());
        });
        expect(result).not.toContain('-');
        expect(result).not.toContain('sky');
    });
    test("Handles Logic for all words in the Pokemon's Form", () => {
        const originalPokemon = 'urshifu-single-strike';
        const result = CapitalizePokemonWithHyphen(originalPokemon);
        const parts = result.split(' ');
        parts.forEach((part) => {
            const firstChar = part.charAt(0);
            expect(firstChar).toEqual(firstChar.toUpperCase());
        });
        expect(result).not.toContain('-');
        expect(result).not.toContain('single');
    });
})