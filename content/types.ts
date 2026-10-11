import type { en } from "./en";

type Translated<Value> = Value extends string
  ? string
  : Value extends readonly (infer Item)[]
    ? readonly Translated<Item>[]
    : Value extends object
      ? { [Key in keyof Value]: Translated<Value[Key]> }
      : Value;

export type Content = Translated<typeof en>;

/** Ids of a dictionary list, used to key its translations. */
export type Ids<List extends readonly { id: string }[]> = List[number]["id"];
