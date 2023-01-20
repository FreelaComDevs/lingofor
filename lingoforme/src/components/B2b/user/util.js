function sortArrayByEndDateDesc(arr) {
  arr.sort((a, b) => {
    return a.endDate < b.endDate ? 1 : (( a.endDate > b.endDate) ? -1 : 0);
  })
  return arr;
}

export default {
  sortArrayByEndDateDesc
}
