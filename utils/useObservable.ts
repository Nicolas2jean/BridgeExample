import { Observable } from 'rxjs';
import { useEffect, useState } from 'react';

const useObservable = <T extends Record<string, unknown>>(observable?: Observable<T>) => {
  // const [observable, setObservable] = useState<Observable<T> | null>(initObservable || null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const obs = observable?.subscribe((e) => {
      //  console.log('useObservable UPDATE', e);
      setData({ ...data, ...e });
    });
    // console.log('observer created ', obs);
    return () => {
      //    console.log('observer destroyed ', obs);
      obs?.unsubscribe();
    };
  }, []);

  return data;
};

export default useObservable;
