import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const mediaTabNames = ["Found media", "Selected media"] as const;
export type MediaTabName = (typeof mediaTabNames)[number];
const mediaTabFocus = atom<MediaTabName>({ key: "mediaTabFocus", default: "Found media" });

export const useMediaTabFocusState = () => {
  return useRecoilValue(mediaTabFocus);
};

export const useMediaTabFocusMutators = () => {
  const setMediaTabFocus = useSetRecoilState(mediaTabFocus);
  return { setMediaTabFocus };
};
