export const haveSameElements = (arr1: any[], arr2: any[]): boolean => {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) {
    return false;
  }
  // Check if all elements in arr1 are in arr2
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) {
      return false;
    }
  }
  return true;
};
