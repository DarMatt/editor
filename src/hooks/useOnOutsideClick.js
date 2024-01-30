import { useRef, useEffect } from 'react';

const useOnOutsideClick = (handleOutsideClick) => {
  const innerBorderRef = useRef();

  const onClick = (event) => {
    if (innerBorderRef.current && !innerBorderRef.current.contains(event.target)) {
      handleOutsideClick();
    }
  };

  useMountEffect(() => {
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
    };
  });

  return { innerBorderRef };
};

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMountEffect = (fun) => useEffect(fun, []);

export default useOnOutsideClick;
