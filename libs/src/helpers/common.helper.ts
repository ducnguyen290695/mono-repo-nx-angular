import sjson from 'secure-json-parse';

class CommonHelper {
  /**
   * The `sleep` function in TypeScript returns a Promise that resolves after a specified number of
   * milliseconds.
   * @param {number} ms - The `ms` parameter in the `sleep` function represents the number of
   * milliseconds for which the function will wait before resolving the promise.
   */
  static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * The function `safelyJsonParse` attempts to parse a JSON string and returns an object, or an empty
   * object if parsing fails.
   * @param {string} json - The `json` parameter in the `safelyJsonParse` function is a string that
   * represents a JSON object.
   */
  static safelyJsonParse(json: string): object {
    try {
      return sjson.parse(json);
    } catch {
      return {};
    }
  }

  /**
   * The `copyToClipboard` function asynchronously copies the provided text to the clipboard using the
   * Clipboard API.
   * @param {string} text - The `text` parameter in the `copyToClipboard` function is a string that
   * represents the text you want to copy to the clipboard.
   */
  static async copyToClipboard(text: string): Promise<void> {
    if (!navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
    }
  }
}

export default CommonHelper;
