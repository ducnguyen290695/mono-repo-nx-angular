export class StringHelper {
  /**
   * The function generates a random string of a specified length using a combination of uppercase
   * letters, lowercase letters, and numbers.
   * @param {number} length - The `length` parameter specifies the
   * desired length of the random string that will be generated.
   */
  static generateRandomString(length: number): string {
    if (length <= 0) {
      return '';
    }

    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    let counter = 0;

    while (counter < length) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
      counter += 1;
    }

    return result;
  }

  /**
   * The function generates a random UUID (Universally Unique Identifier) using cryptographic randomness.
   */
  static uuidv4(): string {
    const template = '10000000-1000-4000-8000-100000000000';
    const regex = /[018]/g;

    return template.replace(regex, (c) =>
      (
        +c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
      ).toString(16),
    );
  }

  /**
   * The function normalizes a string by removing diacritical marks.
   * @param {string} str - The input string to be normalized.
   */
  static normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
}
