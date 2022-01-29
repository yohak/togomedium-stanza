import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { toggleFooterComponent } from "../functions/toggleFooterComponent";
import { ComponentTrunk } from "../types";

const componentTree = atom<ComponentTrunk>({ key: "componentTree", default: [] });

export const useComponentTreeState = () => {
  return useRecoilValue(componentTree);
};

export const useComponentTreeMutators = () => {
  const setComponentTree = useSetRecoilState(componentTree);

  const toggleComponent = (id: string) => {
    setComponentTree((prev) => {
      const result = toggleFooterComponent(id, prev);
      if (result) {
        return result;
      } else {
        return [];
      }
    });
  };
  return { toggleComponent, setComponentTree };
};
