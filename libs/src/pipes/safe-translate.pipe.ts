import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generic translation pipe that safely translates a given key or array of keys.
 */
@Pipe({
  name: 'safeTranslate',
  standalone: true,
  pure: false,
})
export class SafeTranslatePipe implements PipeTransform {
  private translate = inject(TranslateService);

  transform(value: string | string[]): string {
    if (!value) return '';

    return Array.isArray(value)
      ? value.map((key) => this.translate.instant(key)).join(' ')
      : this.translate.instant(value);
  }
}
