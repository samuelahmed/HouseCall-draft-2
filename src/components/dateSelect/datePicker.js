import { useRef } from "react";
import { useDatePickerState } from "@react-stately/datepicker";
import { useDatePicker } from "@react-aria/datepicker";
import { FieldButton } from "./button";
import { Calendar } from "./calendar";
import { DateField } from "./dateField";
import { Popover } from "./popover";
import { CalendarIcon, ExclamationIcon } from "@heroicons/react/outline";
//@heroicons/react@v1 used on purpose here.
//Using v2 we can go into the specific react/24/outline folder but the ExlamationIcon does not seem available there.

export function DatePicker(props) {
  let state = useDatePickerState(props);
  let ref = useRef();
  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);

  return (
    <div className="relative inline-flex flex-col text-left">
      <span {...labelProps} className="text-sm">
        {props.label}
      </span>
      <div {...groupProps} ref={ref} className="group flex">
        <div className="relative flex items-center border border-blue7 bg-blue1 p-1 pr-10 group-focus-within:border-blue8 dark:border-darkBlue7 dark:bg-darkBlue1 dark:group-focus-within:border-darkBlue8">
          <DateField {...fieldProps} />
          {state.validationState === "invalid" && (
            <ExclamationIcon className="absolute right-1 h-6 w-6" />
          )}
        </div>
        <FieldButton {...buttonProps} isPressed={state.isOpen}>
          <CalendarIcon className=" h-5 w-5" />
        </FieldButton>
      </div>
      {state.isOpen && (
        <Popover
          {...dialogProps}
          isOpen={state.isOpen}
          onClose={() => state.setOpen(false)}
        >
          <Calendar {...calendarProps} />
        </Popover>
      )}
    </div>
  );
}
