import { Capitalize, 
         CapitalizeHyphen, 
         CapitalizeWordsRemoveHyphen, 
         CapitalizePokemonWithHyphen 
        } from './Helpers.js';

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