import { useRef } from "react";
import { useLocale } from "@react-aria/i18n";
import { useTimeFieldState } from "@react-stately/datepicker";
import { useTimeField } from "@react-aria/datepicker";
import { DateSegment } from "./dateSegment";

export function TimeField(props) {
  let { locale } = useLocale();
  let state = useTimeFieldState({
    ...props,
    locale,
  });

  let ref = useRef();
  let { labelProps, fieldProps } = useTimeField(props, state, ref);

  return (
    <div className="flex flex-col items-start">
      <span {...labelProps} className="text-sm">
        {props.label}
      </span>
      <div
        {...fieldProps}
        ref={ref}
        className="flex border px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue11"
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </div>
    </div>
  );
}
