import { useRef } from "react";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";

export function CalendarButton(props) {
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);
  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={` ${props.isDisabled ? "" : ""} ${
        !props.isDisabled ? "" : ""
      } ${isFocusVisible ? "" : ""}`}
    >
      {props.children}
    </button>
  );
}

export function FieldButton(props) {
  let ref = useRef();
  let { buttonProps, isPressed } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`-ml-px px-2 ${
        isPressed || props.isPressed
          ? "bg-blue2 dark:bg-darkBlue2"
          : "bg-blue1 dark:bg-darkBlue1 "
      }`}
    >
      {props.children}
    </button>
  );
}
