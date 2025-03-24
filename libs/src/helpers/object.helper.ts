import { isEmpty } from 'lodash';

export class ObjectHelper {
  /**
   * Removes empty keys from an object.
   */
  static removeEmptyKeys(object: object): object {
    if (isEmpty(object)) {
      return {};
    }

    return Object.entries(object).reduce((acc, [key, value]) => {
      if (!isEmpty(key)) {
        Object.assign(acc, {
          [key]: value,
        });
      }

      return acc;
    }, {});
  }

  /**
   * Removes empty values from an object and returns a new object
   * without those empty values.
   */
  static removeEmptyValues(object: object): object {
    if (isEmpty(object)) {
      return {};
    }

    return Object.entries(object).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        Object.assign(acc, {
          [key]: value,
        });
      }

      return acc;
    }, {});
  }

  /**
   * Removes specified keys from an object.
   */
  static omit(object: object, keys: string[]): object {
    if (isEmpty(object)) {
      return {};
    }

    return Object.entries(object).reduce((acc, [key, value]) => {
      if (!keys.includes(key)) {
        Object.assign(acc, {
          [key]: value,
        });
      }

      return acc;
    }, {});
  }

  /**
   * Returns a new object with only the specified keys and their corresponding values.
   */
  static pick(object: object, keys: string[]): object {
    if (isEmpty(object)) {
      return {};
    }

    return Object.entries(object).reduce((acc, [key, value]) => {
      if (keys.includes(key)) {
        Object.assign(acc, {
          [key]: value,
        });
      }

      return acc;
    }, {});
  }
}
