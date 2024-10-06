export const calculateProgress = (startDate: Date, endDate: Date): number => {
  const today = new Date();
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = today.getTime() - startDate.getTime();
  const progress = Math.min((elapsedDuration / totalDuration) * 100, 100);
  return progress;
};
