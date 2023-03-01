import { useRef } from "react";
import { useCalendarCell } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { isSameDay, getDayOfWeek } from "@internationalized/date";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";

export function CalendarCell({ state, date }) {
  let ref = useRef();
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid,
  } = useCalendarCell({ date }, state, ref);

  // The start and end date of the selected range will have
  // an emphasized appearance.
  let isSelectionStart = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.start)
    : isSelected;
  let isSelectionEnd = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.end)
    : isSelected;

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  let { locale } = useLocale();
  let dayOfWeek = getDayOfWeek(date, locale);
  let isRoundedLeft =
    isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
  let isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      date.day === date.calendar.getDaysInMonth(date));

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={`relative py-0.5 ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={`group h-10 w-10 outline-none ${
          isRoundedLeft ? "rounded-l-full" : ""
        } ${isRoundedRight ? "rounded-r-full" : ""} ${
          //this will be the selected date after the user clicks on it
          //isInvalid I assume are earlier in the month? it is the first day and calendar does not go to past months
          //so there is no way to easily test this. or is there?
          isSelected ? (isInvalid ? "" : "") : ""
        } ${isDisabled ? "disabled" : ""}`}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full ${
            isDisabled && !isInvalid ? "" : ""
          } ${
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible ? "" : ""
          } ${
            // Darker selection background for the start and end.
            //why is this overwriting the one above?
            isSelectionStart || isSelectionEnd
              ? isInvalid
                ? ""
                : "bg-blue7 text-olive12 hover:bg-blue3 dark:bg-darkBlue7 dark:text-darkOlive12"
              : ""
          } ${
            // Hover state for cells in the middle of the range.
            //what is this doing?
            isSelected && !isDisabled && !(isSelectionStart || isSelectionEnd)
              ? isInvalid
                ? ""
                : ""
              : ""
          } ${
            // Hover state for non-selected cells.
            !isSelected && !isDisabled
              ? "hover:bg-blue5 dark:hover:bg-darkBlue5"
              : ""
          } cursor-default`}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  );
}
