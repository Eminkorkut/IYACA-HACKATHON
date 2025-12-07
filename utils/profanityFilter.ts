// Turkish profanity filter utility
// This file contains profanity detection for Turkish language

const profanityWords = [
    // Common Turkish profanity words (censored list)
    'aptal',
    'salak',
    'ahmak',
    'gerizekalı',
    'mal',
    'dangalak',
    'budala',
    'geri zekalı',
    'serseri',
    'pislik',
    'rezil',
    'alçak',
    'hain',
    'namussuz',
    'şerefsiz',
    'kahpe',
    'orospu',
    'pezevenk',
    'piç',
    'göt',
    'sik',
    'amk',
    'aq',
    'amına',
    'sikerim',
    'sikeyim',
    'siktir',
    'bok',
    'çöp',
    'pislik',
    'it',
    'köpek',
    'eşek',
    'domuz',
    'hayvan',
    'canavar',
    'ucube',
    'sapık',
    'tacizci',
    'tecavüz',
    'öldür',
    'gebertir',
    'katil',
    'ölüm',
    'intihar',
    'kendine zarar',
]

/**
 * Normalizes text for profanity detection
 * - Converts to lowercase
 * - Removes extra spaces
 * - Handles common character substitutions (e.g., 0 for o, 1 for i)
 */
function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ')
        // Handle common character substitutions
        .replace(/0/g, 'o')
        .replace(/1/g, 'i')
        .replace(/3/g, 'e')
        .replace(/4/g, 'a')
        .replace(/5/g, 's')
        .replace(/7/g, 't')
        .replace(/8/g, 'b')
        // Remove special characters that might be used to bypass filter
        .replace(/[*_\-+.]/g, '')
}

/**
 * Checks if the text contains profanity
 * @param text - The text to check
 * @returns true if profanity is detected, false otherwise
 */
export function containsProfanity(text: string): boolean {
    if (!text || text.trim().length === 0) {
        return false
    }

    const normalizedText = normalizeText(text)

    // Check for exact word matches with word boundaries
    for (const word of profanityWords) {
        const normalizedWord = normalizeText(word)

        // Create regex pattern with word boundaries
        // \b doesn't work well with Turkish characters, so we use space or start/end of string
        const pattern = new RegExp(`(^|\\s)${normalizedWord}(\\s|$)`, 'i')

        if (pattern.test(normalizedText)) {
            return true
        }

        // Also check if the word is contained within the text (for compound words)
        if (normalizedText.includes(normalizedWord)) {
            return true
        }
    }

    return false
}

/**
 * Gets a user-friendly warning message
 */
export function getProfanityWarningMessage(): string {
    return 'Mesajınız uygunsuz içerik içerdiği için gönderilemedi. Lütfen saygılı bir dil kullanın.'
}
