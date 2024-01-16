export function getWeekDays(
  startDate: Date,
  endDate: Date,
  weekDays: string[]
) {
  const currentDate = new Date(startDate);

  const classDates: Date[] = [];
  while (currentDate <= endDate) {
    if (
      weekDays.includes(
        currentDate
          .toLocaleDateString("en-US", { weekday: "short" })
          .toLowerCase()
      )
    ) {
      classDates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return classDates;
}
