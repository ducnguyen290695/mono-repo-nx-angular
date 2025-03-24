import { Pipe, PipeTransform } from '@angular/core';

/**
 * KeyValuePipe - Converts an object into an array of key-value pairs.
 * Input: { name: 'Alice', age: 25 }
 * Usage: {{ myObject | keyValue }}
 * Output: [{ key: 'name', value: 'Alice' }, { key: 'age', value: 25 }]
 */
@Pipe({ name: 'keyValue' })
export class KeyValuePipe implements PipeTransform {
  transform(obj: { [key: string]: any }): { key: string; value: any }[] {
    return Object.keys(obj).map((key) => ({ key, value: obj[key] }));
  }
}

/**
 * IsEmptyPipe - Checks if an object is empty.
 * Input: {}
 * Usage: {{ myObject | isEmpty }}
 * Output: true
 */
@Pipe({ name: 'isEmpty' })
export class IsEmptyPipe implements PipeTransform {
  transform(value: object): boolean {
    return Object.keys(value).length === 0;
  }
}

/**
 * JsonPrettyPipe - Converts an object to a formatted JSON string.
 * Input: { name: 'Alice', age: 25 }
 * Usage: {{ myObject | jsonPretty:2 }}
 * Output: '{\n  "name": "Alice",\n  "age": 25\n}'
 */
@Pipe({ name: 'jsonPretty' })
export class JsonPrettyPipe implements PipeTransform {
  transform(value: any, spaces: number = 2): string {
    return JSON.stringify(value, null, spaces);
  }
}

/**
 * ObjectKeysPipe - Returns an array of object keys.
 * Input: { name: 'Alice', age: 25 }
 * Usage: {{ myObject | objectKeys }}
 * Output: ['name', 'age']
 */
@Pipe({ name: 'objectKeys' })
export class ObjectKeysPipe implements PipeTransform {
  transform(value: object): string[] {
    return Object.keys(value);
  }
}

/**
 * ObjectValuesPipe - Returns an array of object values.
 * Input: { name: 'Alice', age: 25 }
 * Usage: {{ myObject | objectValues }}
 * Output: ['Alice', 25]
 */
@Pipe({ name: 'objectValues' })
export class ObjectValuesPipe implements PipeTransform {
  transform(value: object): any[] {
    return Object.values(value);
  }
}

/**
 * ObjectToArrayPipe - Converts an object into an array of key-value objects.
 * Input: { name: 'Alice', age: 25 }
 * Usage: {{ myObject | objectToArray }}
 * Output: [{ key: 'name', value: 'Alice' }, { key: 'age', value: 25 }]
 */
@Pipe({ name: 'objectToArray' })
export class ObjectToArrayPipe implements PipeTransform {
  transform(value: object): { key: string; value: any }[] {
    return Object.entries(value).map(([key, value]) => ({ key, value }));
  }
}

/**
 * FilterObjectByKeyPipe - Filters an object to include only keys containing a given substring.
 * Input: { firstName: 'Alice', lastName: 'Brown' }, 'first'
 * Usage: {{ myObject | filterObjectByKey:'first' }}
 * Output: { firstName: 'Alice' }
 */
@Pipe({ name: 'filterObjectByKey' })
export class FilterObjectByKeyPipe implements PipeTransform {
  transform(value: object, searchKey: string): object {
    return Object.fromEntries(
      Object.entries(value).filter(([key]) => key.includes(searchKey)),
    );
  }
}

/**
 * FilterObjectByValuePipe - Filters an object to include only key-value pairs where the value contains a given substring.
 * Input: { name: 'Alice', city: 'Paris' }, 'Alice'
 * Usage: {{ myObject | filterObjectByValue:'Alice' }}
 * Output: { name: 'Alice' }
 */
@Pipe({ name: 'filterObjectByValue' })
export class FilterObjectByValuePipe implements PipeTransform {
  transform(value: object, searchValue: string): object {
    return Object.fromEntries(
      Object.entries(value).filter(([_, val]) =>
        String(val).includes(searchValue),
      ),
    );
  }
}

/**
 * MergeObjectsPipe - Merges two objects into one.
 * Input: { name: 'Alice' }, { age: 25 }
 * Usage: {{ obj1 | mergeObjects:obj2 }}
 * Output: { name: 'Alice', age: 25 }
 */
@Pipe({ name: 'mergeObjects' })
export class MergeObjectsPipe implements PipeTransform {
  transform(obj1: object, obj2: object): object {
    return { ...obj1, ...obj2 };
  }
}

/**
 * SortObjectKeysPipe - Sorts an object's keys in alphabetical order.
 * Input: { b: 2, a: 1, c: 3 }
 * Usage: {{ myObject | sortObjectKeys }}
 * Output: { a: 1, b: 2, c: 3 }
 */
@Pipe({ name: 'sortObjectKeys' })
export class SortObjectKeysPipe implements PipeTransform {
  transform(value: object): object {
    return Object.fromEntries(
      Object.entries(value).sort(([a], [b]) => a.localeCompare(b)),
    );
  }
}

/**
 * ReverseObjectKeysPipe - Reverses the order of an object's keys.
 * Input: { a: 1, b: 2, c: 3 }
 * Usage: {{ myObject | reverseObjectKeys }}
 * Output: { c: 3, b: 2, a: 1 }
 */
@Pipe({ name: 'reverseObjectKeys' })
export class ReverseObjectKeysPipe implements PipeTransform {
  transform(value: object): object {
    return Object.fromEntries(Object.entries(value).reverse());
  }
}

/**
 * DeepClonePipe - Creates a deep copy of an object.
 * Input: { name: 'Alice', address: { city: 'Paris' } }
 * Usage: {{ myObject | deepClone }}
 * Output: { name: 'Alice', address: { city: 'Paris' } }
 */
@Pipe({ name: 'deepClone' })
export class DeepClonePipe implements PipeTransform {
  transform(value: object): object {
    return JSON.parse(JSON.stringify(value));
  }
}
