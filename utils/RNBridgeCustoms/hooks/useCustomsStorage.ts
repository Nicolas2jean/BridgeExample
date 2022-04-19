import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { CustomsConfigType, SectionName, UnionToIntersection, CustomsBehaviorSubjectType, CustomsObservableType } from './customs-type';

const useCustomsStorage = <T extends Record<string, CustomsConfigType>>(props: T) => {
  // use subject observable
  const [data, setData] = useState<Partial<CustomsBehaviorSubjectType<T>>>({});
  const [isStorageDone, setIsStorageDone] = useState<boolean>(false);

  useEffect(() => {
    // don't like this
    const wrappedData: Partial<CustomsBehaviorSubjectType<T>> = {};
    for (const section in props) {
      if (Object.prototype.hasOwnProperty.call(props, section)) {
        wrappedData[section.split('_')[0] as SectionName<typeof section>[0]] = new BehaviorSubject(
          props[section]['data'] as UnionToIntersection<T[typeof section]['data']>,
        );
      }
    }
    setData(wrappedData);
    setIsStorageDone(true);
  }, []);

  const updateData = <Key extends keyof CustomsBehaviorSubjectType<T>>(
    callKey: Key,
    callData: Partial<CustomsBehaviorSubjectType<T>[Key]>,
  ) => {
    // destroying type here (not good)
    data[callKey]?.next(Object.assign(data[callKey]?.getValue() || {}, callData) as UnionToIntersection<typeof callData>);
  };

  const getObservable = <Key extends keyof CustomsBehaviorSubjectType<T> & keyof CustomsObservableType<T>>(
    storageKey: Key,
  ): CustomsObservableType<T>[Key] => {
    return data[storageKey]?.asObservable() as CustomsObservableType<T>[Key];
  };

  return {
    updateData,
    data,
    isStorageDone,
    getObservable,
  };
};

export default useCustomsStorage;
