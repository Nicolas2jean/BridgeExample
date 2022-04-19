import { BehaviorSubject, Observable } from 'rxjs';

// https://fettblog.eu/variadic-tuple-types-preview/
// infer => retrieve args from generique function example: https://dev.to/aexol/typescript-tutorial-infer-keyword-2cn
export type InferArgs<T> = T extends (...t: [...infer Arg]) => any ? Arg : never;
export type InferReturn<T> = T extends (...t: [...infer Arg]) => infer Res ? Res : never;
export type CustomsFunctionType<TFunc> = (...args: InferArgs<TFunc>) => InferReturn<TFunc>;

/**
 * {@link https://www.notion.so/React-Native-Creating-customs-configurations-55cf6e33deb342c6b1ba37846e4b2f54 Customs Configuration}
 *
 * Object contains typed information about a specific customs call.
 *
 * - customs call
 * - the requestCode linked to the customs call
 * - data returned by customs call accessible through {@link https://www.notion.so/useCustomsStorage-13a626ee3dbf4aea96946a42b1d32f21 customs storage}
 *
 * The key of the object should be as such
 *
 *  @example
 *  [section name]_[what it does]: {
 *    call: (...args: any[]) => any;
 *    code: string;
 *    data?: Record<string, unknown>;
 *  }
 *
 */

export type CustomsConfigType = {
  /**
   * customs call
   */
  call: (...args: any[]) => any;
  /**
   * requestCode linked to the customs call
   */
  code: string;
  /**
   * data returned by customs call
   */
  data?: Record<string, unknown>;
};

/**
 * Object containing native calls with its linked JS code
 */
export type MainThreadQueueType<T extends Record<string, CustomsConfigType>> = {
  /**
   * JS code corresponding to the wrapped native call
   */
  code: T[keyof T]['code'];
  /**
   * wrapped native call that has been loaded with its arguments and ready to execute
   */
  call: () => void;
};

/**
 * {@link https://www.notion.so/6-4-useCustomsCall-88dabede22bb44bc8b05a65a37202184 Customs call}
 *
 *
 * Object contains typed wrapped native call.
 *
 * Allows us to replace native call to fill mainThreadQueue with {@link MainThreadQueueType}
 *
 *  @example
 *  // this fills the main thread queue
 *  [section name]_[what it does]: (args) => void
 *
 *
 */
export type CustomsCallType<T extends Record<string, CustomsConfigType>> = {
  [K in keyof T]: (...args: InferArgs<T[K]['call']>) => void;
};

export type SectionName<S extends string | number | symbol> = S extends `${infer A}_${infer B}` ? [A, B] : 'not_typed';

export type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

export type CustomsBehaviorSubjectType<T extends Record<string, CustomsConfigType>> = {
  [J in keyof T as SectionName<J>[0]]: BehaviorSubject<UnionToIntersection<T[J]['data']>>;
};

export type CustomsObservableType<T extends Record<string, CustomsConfigType>> = {
  [J in keyof T as SectionName<J>[0]]: Observable<UnionToIntersection<T[J]['data']>>;
};

/**
 * {@link https://www.notion.so/6-2-useCustoms-6aeb7f6b85034a31bd7e1d90e768988b Customs}
 *
 * Return value of useCustoms
 *
 * - {@link CustomsCallType} comes from {@link https://www.notion.so/6-4-useCustomsCall-88dabede22bb44bc8b05a65a37202184 useCustomsCall}
 * - getObservable comes from {@link https://www.notion.so/6-3-useCustomsStorage-51e3b7140882401989c9e856336b407e useCustomsStorage}
 */
export type CustomsObjectType<T extends Record<string, CustomsConfigType>> = Partial<CustomsCallType<T>> & {
  isInitDone: boolean;
  getObservable: <Key extends keyof CustomsBehaviorSubjectType<T> & keyof CustomsObservableType<T>>(
    storageKey: Key,
  ) => CustomsObservableType<T>[Key];
};
