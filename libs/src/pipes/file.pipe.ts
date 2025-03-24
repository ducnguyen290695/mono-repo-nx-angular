/**
 * Angular Pipe for File Size Formatting
 */

import { Pipe, PipeTransform } from '@angular/core';

/**
 * FileSizePipe - Converts a file size in bytes to a human-readable format.
 * Input: 1024
 * Usage: {{ 1024 | fileSize }}
 * Output: '1 KB'
 *
 * Input: 1048576
 * Usage: {{ 1048576 | fileSize }}
 * Output: '1 MB'
 */
@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
  transform(size: number, decimals: number = 2): string {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));

    return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
