import { useRef } from "react";
import { useLocale } from "@react-aria/i18n";
import { useTimeFieldState } from "@react-stately/datepicker";
import { useTimeField } from "@react-aria/datepicker";
import { DateSegment } from "./dateSegment";

export function TimeField(props) {
  let { locale } = useLocale();
  let state = useTimeFieldState({
    ...props,
    locale
  });

  let ref = useRef();
  let { labelProps, fieldProps } = useTimeField(props, state, ref);

  return (
    <div className="flex flex-col items-start">
      <span {...labelProps} className="text-sm text-gray-800">
        {props.label}
      </span>
      <div
        {...fieldProps}
        ref={ref}
        className="flex bg-blue1 dark:bg-darkBlue1 border border-blue7 dark:border-darkBlue7 hover:border-blue8 dark:hover:border-blue8 pr-4 p-1"
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </div>
    </div>
  );
}