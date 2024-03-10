export const getPagination = (props: { totalPages: number; currentPage: number }) => {
  const { totalPages, currentPage } = props;
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(start + 4, totalPages);
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  let startNum = result[0] - 1;
  while (result.length < 5 && startNum > 1) {
    result.unshift(startNum);
    startNum -= 1;
  }
  return result;
};
