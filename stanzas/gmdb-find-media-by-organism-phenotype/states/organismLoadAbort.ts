import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Nullable } from "yohak-tools";

const organismLoadAbort = atom<Nullable<AbortController>>({
  key: "organismLoadAbort",
  default: null,
});

export const useIsOrganismLoading = () => {
  return !!useRecoilValue(organismLoadAbort);
};

export const useOrganismLoadAbortMutators = () => {
  const setOrganismLoadAbort = useSetRecoilState(organismLoadAbort);
  const abortCurrentLoading = (): boolean => {
    let result: boolean = false;
    setOrganismLoadAbort((prev) => {
      if (prev) {
        prev.abort();
        result = true;
      }
      return null;
    });
    return result;
  };
  const setNextOrganismLoadAbort = (abort: Nullable<AbortController>) => {
    setOrganismLoadAbort((prev) => {
      if (prev) {
        prev.abort();
      }
      return abort;
    });
  };
  return { abortCurrentLoading, setNextOrganismLoadAbort };
};
