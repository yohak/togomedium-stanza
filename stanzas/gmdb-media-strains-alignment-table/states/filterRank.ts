import { atom, useRecoilValue, useSetRecoilState, selector } from "recoil";
import { Optional } from "yohak-tools";
import { LineageRank, lineageRanks } from "../functions/types";

type FilterStatus = Record<LineageRank, boolean>;
const makeDefaultStatus = (): FilterStatus =>
  lineageRanks.reduce((accum: any, current) => {
    return { ...accum, [current]: false };
  }, {});
const filterStatus = atom<FilterStatus>({
  key: "filterStatus",
  default: makeDefaultStatus(),
});

const filterRank = selector({
  key: "filterRank",
  get: ({ get }) => {
    const status = get(filterStatus);
    return findCurrentFilterRank(status);
  },
});

export const useFilterRankState = () => {
  return useRecoilValue(filterRank);
};

export const useFilterRankMutators = () => {
  const setFilterRankStatus = useSetRecoilState(filterStatus);
  const changeFilterRank = (rank: LineageRank, val: boolean) => {
    setFilterRankStatus((prev) => {
      return { ...prev, [rank]: val };
    });
  };
  return { changeFilterRank };
};

const findCurrentFilterRank = (status: FilterStatus): LineageRank => {
  let found: Optional<LineageRank> = undefined;
  const arr = lineageRanks.concat().reverse();
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    const val = status[key];
    if (val) {
      found = key;
    } else {
      break;
    }
  }
  const result = lineageRanks[lineageRanks.indexOf(found!) - 1];
  return result || "strain";
};

export const __TEST__ = {
  findCurrentFilterRank,
  makeDefaultStatus,
};
