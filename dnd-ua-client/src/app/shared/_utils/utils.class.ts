import { RemoveNull } from "dnd-ua-client/src/app/shared/_utils/utils.model";

export class Utils {

  static removeEmpty<T>(obj: T): RemoveNull<T> {
    return Object.fromEntries(
      Object.entries(obj as Object)
        .filter(([_, v]) => v != null)
        // .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
    ) as RemoveNull<T>;
  }

  static isMobileDevice() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
}
