// export default function Images() {
//   const replaceImgWithError = (e) => {
//     e.target.onerror = null;
//     e.target.src = "http://placekitten.com/g/200/300";
//   };

import { useCallback, useEffect, useRef } from "react";

//   const hideImgWhenError = (e) => {
//     e.target.onerror = null;
//     e.target.style.display = "none";
//   };

//   return (
//     <>
//       <p>hi</p>
//       {/* <img
//         onError={replaceImgWithError}
//         alt="foo"
//         src="https://crablets-event-images.s3.amazonaws.com/users/10/top"
//       /> */}
//       <img
//         onError={hideImgWhenError}
//         alt="foo"
//         src="https://crablets-event-images.s3.amazonaws.com/usersss/10/top"
//       />
//     </>
//   );
// }

export default function useFallbackImageInSSR(fallbackSrc) {
  const ref = useRef(null);

  /**
   * Error happened / catched after hydration
   */
  const onError = useCallback(
    (e) => {
      e.target.src = fallbackSrc;
    },
    [fallbackSrc]
  );

  /**
   * Error happened before hydration, but catched after hydration
   */
  useEffect(() => {
    if (ref && ref.current) {
      const { complete, naturalHeight } = ref.current;
      const errorLoadingImgBeforeHydration = complete && naturalHeight === 0;

      if (errorLoadingImgBeforeHydration) {
        ref.current.src = fallbackSrc;
      }
    }
  }, [fallbackSrc]);

  return {
    ref,
    onError,
  };
}
