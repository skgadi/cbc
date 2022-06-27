function getValidInput(val, min, max) {
  let num = parseFloat(val);
  if (isNaN(num)) {
    return min;
  }
  if (num<min) {
    return min;
  }
  if (num>max) {
    return max;
  }
  return num;
}