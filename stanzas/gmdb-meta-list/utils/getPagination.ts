export const getPagination = (props: { total: number; offset: number; limit: number }) => {
  const { total, offset, limit } = props;
  const pages = Math.ceil(total / limit);
  const currentPage = offset + 1;
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(start + 4, pages);
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
