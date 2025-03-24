export class FileHelper {
  /**
   * The function getFileFromUrl asynchronously fetches a file or blob from a given URL.
   * @param {string} url - The `url` parameter in the `getFileFromUrl` function is a string that
   * represents the URL from which a file or blob will be fetched.
   */
  static async getFileFromUrl(url: string): Promise<File | Blob> {
    return await fetch(url).then((res) => res?.blob());
  }

  /**
   * The function `imageUrlToBase64` converts an image URL to a base64 encoded string
   * @param {string} url - The `url` parameter in the `imageUrlToBase64` function is a string
   * representing the URL of an image that you want to convert to a base64 encoded string.
   */
  static async imageUrlToBase64(url: string): Promise<string> {
    const blob = await FileHelper.getFileFromUrl(url);

    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.onload = function () {
          resolve(this.result as string);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * The function `fileToBase64` converts a Blob or File object to a base64 encoded string asynchronously
   * using FileReader.
   * @param {Blob | File} file - The `file` parameter in the `fileToBase64` function can be either a
   * `Blob` or a `File` object. These objects represent raw data in the form of a file, such as images,
   * videos, or other interfaces of files.
   */
  static fileToBase64(file: Blob | File): Promise<string> {
    return new Promise<string>((resolve) => {
      const reader: FileReader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        resolve(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * The function `base64ToFile` converts a base64 string to a File object with the specified filename
   * and MIME type.
   * @param {string} src - The `src` parameter is a base64 encoded string representing the file content.
   * @param {string} filename - The `filename` parameter is a string that represents the name of the file
   * that will be created from the base64 data.
   */
  static base64ToFile(src: string, filename: string): File {
    const arr = src.split(',');
    const mime = arr[0].match(/:([^;]*);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  /**
   * The function `base64toBlob` converts a base64 encoded string to a Blob object.
   * @param {string} src - The `src` parameter in the `base64toBlob` function is a base64 encoded string
   * representing the data of the blob that you want to create.
   */
  static base64toBlob(src: string): Blob {
    const arr = src.split(',');
    const mime = arr[0].match(/:([^;]*);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }

  static getAbsolutePath(href: string): string {
    const link = document.createElement('a');
    link.href = href;

    return link.href;
  }

  /**
   * The `downloadFile` function asynchronously downloads a file from a given path and saves it using the
   * browser's download functionality.
   * @param {string} path - The `path` parameter in the `downloadFile` function is a string representing
   * the path to the file that needs to be downloaded.
   */
  static async downloadFileFromFilePath(path: string): Promise<void> {
    const url = FileHelper.getAbsolutePath(path);
    const filename = url?.split('?')?.[0]?.split('/')?.pop() || '';

    await fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        a.click();
        a.remove();
      });
  }

  /**
   * The `isValidUrl` function in TypeScript checks if a given string is a valid URL by attempting to
   * create a new URL object from it.
   * @param {string} url - The `url` parameter is a string that
   * represents a URL.
   */
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);

      return true;
    } catch (error) {
      console.error('Error:', error);

      return false;
    }
  }

  /**
   * The function `isImage` asynchronously checks if a given URL is an image by attempting to load it as
   * an image.
   * @param {string} url - The `url` parameter in the `isImage` function is a string that
   * represents the URL of an image that you want to check.
   */
  static async isImage(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = url;
    });
  }
}
