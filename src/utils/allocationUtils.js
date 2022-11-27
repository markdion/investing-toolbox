export function calculateAllocationTotal(allocations) {
  return Array.from(allocations).reduce((total, current) => {
    return total + current[1]["percent"];
  }, 0);
}

export function isAllocationsValid(categories) {
  let categoriesArray = Array.from(categories);
  for (let i = 0; i < categoriesArray.length; i++) {
    let category = categoriesArray[i][1];
    if (category.isSuper) {
      let allocationTotal = calculateAllocationTotal(category.allocations);
      if (allocationTotal !== 100) {
        return false;
      }
    }
  }
  return true;
}