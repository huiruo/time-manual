import { useCallback, useEffect, useRef } from 'react';

/*
use：
const queryUtil = ()=>{}
const handleClick = useDebounce((val)=>queryUtil(val),600)
or:
const handleClick = useDebounce(()=>queryUtil(),600)
*/
const useDebounce = (fn: (args?: any) => void, delay: number, dep = []) => {

  const { current } = useRef({ fun: fn, timer: 0 });

  useEffect(() => {

    current.fun = fn;

  }, [fn]);

  return useCallback((args?: any) => {

    if (current.timer) {

      clearTimeout(current.timer);

    }

    current.timer = window.setTimeout(() => {

      current.fun(args);

    }, delay);

  }, dep);

};

export default useDebounce;


/*
function useThrottle(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}
*/
