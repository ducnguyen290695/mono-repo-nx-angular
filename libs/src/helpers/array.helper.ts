import _ from 'lodash';

export class ArrayHelper {
  /**
   * Removes duplicate values from an array.
   * @param array - The input array.
   * @returns A new array with unique values.
   */
  static removeDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)];
  }

  /**
   * Shuffles an array randomly.
   * @param array - The input array.
   * @returns A new shuffled array.
   */
  static shuffle<T>(array: T[]): T[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  /**
   * Splits an array into chunks of a given size.
   * @param array - The input array.
   * @param size - The chunk size.
   * @returns An array of chunks.
   */
  static chunk<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size),
    );
  }

  /**
   * Checks if all elements in the second array exist in the first array.
   * @param firstArray - The first array.
   * @param secondArray - The second array.
   * @returns True if all elements of secondArray exist in firstArray, otherwise false.
   */
  static isContains<T>(firstArray: Array<T>, secondArray: Array<T>): boolean {
    if (!firstArray || !secondArray) {
      return false;
    }

    return secondArray.every((itemInSecondArray) =>
      firstArray.some((itemInFirstArray) =>
        _.isEqual(itemInSecondArray, itemInFirstArray),
      ),
    );
  }

  /**
   * Removes duplicate elements from an array.
   * @param array - The input array.
   * @returns A new array with unique elements.
   */
  static unique<T>(array: Array<T>): Array<T> {
    return array.reduce((acc: Array<T>, item: T) => {
      if (!acc.some((accItem) => _.isEqual(accItem, item))) {
        acc.push(item);
      }

      return acc;
    }, []);
  }

  /**
   * Sorts an array of objects based on multiple sorting criteria.
   * @param list - The input array.
   * @param callbacks - An array of sorting functions.
   * @returns A sorted array.
   */
  static multiSort<T>(
    list: Array<T>,
    callbacks?: Array<(a: T, b: T) => number>,
  ): Array<T> {
    const sortedList = _.cloneDeep(list);
    if (!callbacks) {
      return sortedList;
    }

    callbacks.forEach((callback) => {
      sortedList.sort(callback);
    });

    return sortedList;
  }

  /**
   * Creates a Map from an array using a specified key.
   * @param array - The input array.
   * @param key - The key to use for mapping.
   * @returns A Map object.
   */
  static mapping<T = object>(array: Array<T>, key: keyof T): Map<keyof T, T> {
    const map = new Map();
    array.forEach((item) => {
      map.set(item[key], item);
    });

    return map;
  }

  /**
   * Groups an array of objects by a specified key.
   * @param array - The input array.
   * @param key - The key to group by.
   * @returns A grouped object.
   */
  static groupByKey<T = object>(
    array: Array<T>,
    key: keyof T,
  ): Record<string, T> {
    if (!Array.isArray(array) || _.isEmpty(array)) {
      return {};
    }

    return array.reduce((acc, item) => {
      Object.assign(acc, {
        [item[key] as keyof T]: item,
      });

      return acc;
    }, {});
  }

  /**
   * Validates if the input is an array, returning it if valid, or an empty array otherwise.
   * @param array - The input value.
   * @returns The validated array.
   */
  static validateArray<T>(array: unknown): T[] {
    return Array.isArray(array) ? array : [];
  }

  /**
   * Retrieves a specific chunk from an array.
   * @param array - The input array.
   * @param chunkSize - The size of each chunk.
   * @param chunkIndex - The index of the chunk to retrieve.
   * @returns The specified chunk from the array.
   */
  static getChunk<T>(array: T[], chunkSize: number, chunkIndex: number): T[] {
    return array.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);
  }

  /**
   * Compares two arrays for equality.
   * @param firstArray - The first array.
   * @param secondArray - The second array.
   * @returns True if both arrays contain the same elements, otherwise false.
   */
  static isEqual<T>(firstArray: Array<T>, secondArray: Array<T>): boolean {
    if (
      !firstArray ||
      !secondArray ||
      firstArray.length !== secondArray.length
    ) {
      return false;
    }

    return firstArray.every((itemInFirstArray) =>
      secondArray.some((itemInSecondArray) =>
        _.isEqual(itemInSecondArray, itemInFirstArray),
      ),
    );
  }
}
