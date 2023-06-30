export const calculateDividerOrder = (longestAchievedStep: number) => {
  if (longestAchievedStep < 1 ) {
    return 3;
  }

  return longestAchievedStep + 3;
}