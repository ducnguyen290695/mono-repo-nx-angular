import dayjs, { ConfigType, Dayjs, QUnitType } from 'dayjs';
import 'dayjs/locale/ja';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import _isBetween from 'dayjs/plugin/isBetween';
import _isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import _isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import weekday from 'dayjs/plugin/weekday';
import { LangCodeE } from 'libs/src/services';
import _, { isUndefined } from 'lodash';

export type LocaleT = `${LangCodeE}`;

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(relativeTime);
dayjs.extend(_isBetween);
dayjs.extend(_isSameOrBefore);
dayjs.extend(_isSameOrAfter);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Utility class for date manipulation using Day.js.
 */
export class DateHelper {
  static FORMAT = {
    FORMAT_1: 'DD/MM/YYYY', // Day/Month/Year
    FORMAT_2: 'YYYY/MM/DD', // Year/Month/Day
    FORMAT_3: 'HH:mm', // Hours:Minutes
    FORMAT_4: 'DD/MM/YYYY HH:mm:ss', // Full date and time
    FORMAT_5: 'HH:mm DD/MM/YYYY', // Time first, then date
    FORMAT_6: 'DD/MM', // Day/Month
    FORMAT_7: 'MM/YYYY', // Month/Year
    FORMAT_8: 'YYYY-MM-DD', // ISO-like Year-Month-Day
    FORMAT_9: 'dddd, DD MMMM YYYY', // Full weekday, Day Month Year
    FORMAT_10: 'MMM DD, YYYY', // Abbreviated Month Day, Year
    FORMAT_11: 'YYYY', // Year only
    FORMAT_12: 'HH:mm:ss', // Hours:Minutes:Seconds
    FORMAT_13: 'hh:mm A', // 12-hour format with AM/PM
    FORMAT_14: 'YYYY-MM-DDTHH:mm:ssZ', // ISO 8601 format
    FORMAT_15: 'DD-MM-YYYY', // Day-Month-Year
    FORMAT_16: 'MM-DD-YYYY', // Month-Day-Year
    FORMAT_17: 'DD.MM.YYYY', // Day.Month.Year
    FORMAT_18: 'YYYY.MM.DD', // Year.Month.Day
    FORMAT_19: 'D MMM YYYY', // Day Abbreviated Month Year
    FORMAT_20: 'Do MMMM YYYY', // Day with ordinal (e.g., 1st January 2025)
    FORMAT_21: 'hh:mm:ss A', // 12-hour format with seconds
    FORMAT_22: 'HH:mm:ss.SSS', // Hours:Minutes:Seconds.Milliseconds
    FORMAT_23: 'MMMM DD, YYYY', // Full Month Day, Year
    FORMAT_24: 'YYYY/MM/DD HH:mm:ss', // Year/Month/Day with time
    FORMAT_25: 'dddd', // Full weekday name
    FORMAT_26: 'ddd', // Abbreviated weekday name
    FORMAT_27: 'MMM', // Abbreviated month name
    FORMAT_28: 'MMMM', // Full month name
    FORMAT_29: 'Q YYYY', // Quarter and Year (e.g., Q1 2025)
    FORMAT_30: 'Qo [quarter] YYYY', // Ordinal quarter (e.g., 1st quarter 2025)
  };

  /**
   * Checks if a value is of type Dayjs.
   * @param {unknown} value - The value to check.
   * @returns {boolean} - True if the value is a Dayjs object, otherwise false.
   */
  static isDayjs(value: unknown): value is Dayjs {
    return dayjs.isDayjs(value);
  }

  /**
   * Checks if a given string is a valid date.
   * @param {string} string - The string to validate.
   * @returns {boolean} - True if valid, otherwise false.
   */
  static isDate(string: string): boolean {
    if (isUndefined(string) || !isNaN(Number(string))) {
      return false;
    }

    return dayjs(string).isValid();
  }

  /**
   * Formats a given date.
   * @param {Object} params - Parameters for formatting.
   * @param {ConfigType} params.date - The date to format.
   * @param {string} [params.format=DateFormatE.FORMAT_1] - The format string.
   * @param {LocaleT} [params.locale=LangCodeE.EN] - The locale to use.
   * @param {string} [params.timeZone] - The timezone to use.
   * @returns {string} - The formatted date string.
   */
  static formatDate({
    date,
    format = this.FORMAT.FORMAT_1,
    locale = LangCodeE.EN,
    timeZone = dayjs.tz.guess(),
  }: {
    date: ConfigType;
    format?: string;
    locale?: LocaleT;
    timeZone?: string;
  }): string | null {
    if (_.isEmpty(date) || !dayjs(date).isValid()) {
      return '';
    }

    let _date = date;
    if (this.isDayjs(_date)) {
      _date = _date.toISOString();
    }

    return dayjs(_date)?.tz(timeZone)?.locale(locale)?.format(format);
  }

  /**
   * Converts a given date to an ISO string format.
   * @param {ConfigType} date - The date to convert.
   * @returns {string} - The ISO string representation.
   */
  static toISOString(date: ConfigType): string {
    if (!dayjs(date).isValid()) {
      return '';
    }

    return dayjs(date).toISOString();
  }

  /**
   * Returns the relative time from the given date to now.
   * @param {ConfigType} date - The date to calculate from.
   * @param {boolean} [withoutSuffix=true] - Whether to omit the suffix.
   * @param {LocaleT} [locale=LangCodeE.EN] - The locale to use.
   * @returns {string} - The relative time string.
   */
  static fromNow(
    date: ConfigType,
    withoutSuffix: boolean = true,
    locale: LocaleT = LangCodeE.EN,
  ): string {
    if (!dayjs(date).isValid()) {
      return '';
    }

    return dayjs(date).locale(locale).fromNow(withoutSuffix);
  }

  /**
   * Returns the relative time from now to the given date.
   * @param {ConfigType} date - The date to calculate to.
   * @param {boolean} [withoutSuffix=true] - Whether to omit the suffix.
   * @param {LocaleT} [locale=LangCodeE.EN] - The locale to use.
   * @returns {string} - The relative time string.
   */
  static toNow(
    date: ConfigType,
    withoutSuffix: boolean = true,
    locale: LocaleT = LangCodeE.EN,
  ): string {
    if (!dayjs(date).isValid()) {
      return '';
    }

    return dayjs(date).locale(locale).toNow(withoutSuffix);
  }

  /**
   * Calculates the difference between two dates.
   * @param {ConfigType} firstDate - The first date.
   * @param {ConfigType} secondDate - The second date.
   * @param {QUnitType} [unit='days'] - The unit of time.
   * @returns {number | null} - The difference in the specified unit.
   */
  static difference(
    firstDate: ConfigType,
    secondDate: ConfigType,
    unit: QUnitType = 'days',
  ): number | null {
    if (!dayjs(firstDate).isValid() || !dayjs(secondDate).isValid()) {
      return null;
    }

    return dayjs(secondDate).diff(firstDate, unit);
  }

  /**
   * Returns the number of days in the month of a given date.
   * @param {ConfigType} date - The date to check.
   * @returns {number | null} - The number of days in the month.
   */
  static daysInMonth(date: ConfigType): number | null {
    if (!dayjs(date).isValid()) {
      return null;
    }

    return dayjs(date).daysInMonth();
  }
}
