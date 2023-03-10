import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

export const SummaryTable = () => {
  const summaryDates = generateDatesFromYearBeginning();

  const minSummaryDateSize = 18 * 7;
  const amountOfDatesToFill = minSummaryDateSize - summaryDates.length;

  return (
    <div className="w-full flex ">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {["S", "M", "T", "W", "T", "F", "S"].map((weekDay, index) => {
          return (
            <div
              key={`${index}-${weekDay}`}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          );
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date, index) => {
          return (
            <div key={`${index}-${date.toString()}`}>
              <HabitDay />
            </div>
          );
        })}
        {amountOfDatesToFill > 0 &&
          Array.from({ length: amountOfDatesToFill }).map((_, index) => {
            return (
              <div key={`${index}-empty`}>
                <div className="w-10 h-10 bg-zinc-700 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
              </div>
            );
          })}
      </div>
    </div>
  );
};
