import { RemoveNull } from "dnd-ua-client/src/app/shared/_utils/utils.model";

export class Utils {

  static removeEmpty<T>(obj: T): RemoveNull<T> {
    return Object.fromEntries(
      Object.entries(obj as Object)
        .filter(([_, v]) => v != null)
        // .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
    ) as RemoveNull<T>;
  }
}
