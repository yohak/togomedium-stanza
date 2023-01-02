import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Nullable } from "yohak-tools";

const mediaLoadAbort = atom<Nullable<AbortController>>({ key: "mediaLoadAbort", default: null });

export const useIsMediaLoading = (): boolean => {
  return !!useRecoilValue(mediaLoadAbort);
};

export const useMediaLoadAbortMutators = () => {
  const setMediaLoadAbort = useSetRecoilState(mediaLoadAbort);
  const abortCurrentLoading = (): boolean => {
    let result: boolean = false;
    setMediaLoadAbort((prev) => {
      if (prev) {
        prev.abort();
        result = true;
      }
      return null;
    });
    return result;
  };
  const setNextMediaLoadAbort = (abort: Nullable<AbortController>) => {
    setMediaLoadAbort((prev) => {
      if (prev) {
        prev.abort();
      }
      return abort;
    });
  };
  return { abortCurrentLoading, setNextMediaLoadAbort };
};

// export const
