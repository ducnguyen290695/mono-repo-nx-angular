/**
 * Angular Pipes Documentation with Examples
 */

import { Pipe, PipeTransform } from '@angular/core';

/**
 * FilterPipe - Filters an array based on a search string applied to a specific property.
 * Input: [{ name: 'apple' }, { name: 'banana' }, { name: 'pineapple' }]
 * Usage: {{ items | filter:'apple':'name' }}
 * Output: [{ name: 'apple' }, { name: 'pineapple' }]
 */
@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, property: string): any[] {
    if (!items || !searchText) return items;
    searchText = searchText.toLowerCase();

    return items.filter((item) =>
      item[property].toLowerCase().includes(searchText),
    );
  }
}

/**
 * UniquePipe - Removes duplicate values from an array.
 * Input: [1, 2, 2, 3, 4, 4]
 * Usage: {{ values | unique }}
 * Output: [1, 2, 3, 4]
 */
@Pipe({ name: 'unique' })
export class UniquePipe implements PipeTransform {
  transform(value: any[]): any[] {
    return [...new Set(value)];
  }
}

/**
 * ChunkArrayPipe - Splits an array into smaller chunks of a specified size.
 * Input: [1, 2, 3, 4, 5]
 * Usage: {{ values | chunkArray:2 }}
 * Output: [[1, 2], [3, 4], [5]]
 */
@Pipe({ name: 'chunkArray' })
export class ChunkArrayPipe implements PipeTransform {
  transform(value: any[], chunkSize: number): any[][] {
    return Array.from({ length: Math.ceil(value.length / chunkSize) }, (_, i) =>
      value.slice(i * chunkSize, i * chunkSize + chunkSize),
    );
  }
}

/**
 * SortArrayPipe - Sorts an array in ascending or descending order.
 * Input: [3, 1, 4, 5, 2]
 * Usage: {{ values | sortArray:'asc' }}
 * Output: [1, 2, 3, 4, 5]
 */
@Pipe({ name: 'sortArray' })
export class SortArrayPipe implements PipeTransform {
  transform(value: any[], order: 'asc' | 'desc' = 'asc'): any[] {
    return [...value].sort((a, b) =>
      order === 'asc' ? (a > b ? 1 : -1) : a < b ? 1 : -1,
    );
  }
}

/**
 * LastNPipe - Returns the last N elements of an array.
 * Input: [1, 2, 3, 4, 5]
 * Usage: {{ values | lastN:3 }}
 * Output: [3, 4, 5]
 */
@Pipe({ name: 'lastN' })
export class LastNPipe implements PipeTransform {
  transform(value: any[], count: number): any[] {
    return value.slice(-count);
  }
}

/**
 * ShufflePipe - Shuffles an array randomly.
 * Input: [1, 2, 3, 4, 5]
 * Usage: {{ values | shuffle }}
 * Output: [3, 1, 5, 2, 4] (randomized)
 */
@Pipe({ name: 'shuffle' })
export class ShufflePipe implements PipeTransform {
  transform(value: any[]): any[] {
    return [...value].sort(() => Math.random() - 0.5);
  }
}

/**
 * CountPipe - Returns the number of elements in an array.
 * Input: [1, 2, 3, 4, 5]
 * Usage: {{ values | count }}
 * Output: 5
 */
@Pipe({ name: 'count' })
export class CountPipe implements PipeTransform {
  transform(value: any[]): number {
    return value.length;
  }
}

/**
 * UniqueByKeyPipe - Filters an array to remove duplicate objects based on a key.
 * Input: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 1, name: 'C' }]
 * Usage: {{ items | uniqueByKey:'id' }}
 * Output: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]
 */
@Pipe({ name: 'uniqueByKey' })
export class UniqueByKeyPipe implements PipeTransform {
  transform(value: any[], key: string): any[] {
    return value.filter(
      (item, index, self) =>
        index === self.findIndex((obj) => obj[key] === item[key]),
    );
  }
}

/**
 * MaxValuePipe - Returns the maximum value in an array of numbers.
 * Input: [1, 3, 5, 2, 4]
 * Usage: {{ numbers | maxValue }}
 * Output: 5
 */
@Pipe({ name: 'maxValue' })
export class MaxValuePipe implements PipeTransform {
  transform(value: number[]): number {
    return Math.max(...value);
  }
}

/**
 * MinValuePipe - Returns the minimum value in an array of numbers.
 * Input: [1, 3, 5, 2, 4]
 * Usage: {{ numbers | minValue }}
 * Output: 1
 */
@Pipe({ name: 'minValue' })
export class MinValuePipe implements PipeTransform {
  transform(value: number[]): number {
    return Math.min(...value);
  }
}

/**
 * SumArrayPipe - Calculates the sum of an array of numbers.
 * Input: [1, 2, 3, 4, 5]
 * Usage: {{ numbers | sumArray }}
 * Output: 15
 */
@Pipe({ name: 'sumArray' })
export class SumArrayPipe implements PipeTransform {
  transform(value: number[]): number {
    return value.reduce((acc, num) => acc + num, 0);
  }
}
