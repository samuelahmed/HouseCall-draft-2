import React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const SelectSessionType = () => (
  <Select.Root>
    <Select.Trigger
      className="SelectTrigger flex flex-row items-center space-x-1"
      aria-label="Food"
    >
      <Select.Value
        className="placeholder-olive10 dark:placeholder-darkOlive10"
        placeholder="Session Type"
      />
      <Select.Icon className="SelectIcon">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="SelectContent">
        <Select.ScrollUpButton className="SelectScrollButton">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="SelectViewport border-1 border bg-blue1 dark:bg-darkBlue1">
          <Select.Group>
            <SelectItem value="Mobility Support">Mobility Support</SelectItem>
            <SelectItem value="Personal Care">Personal Care</SelectItem>
            <SelectItem value="Home Care">Home Care</SelectItem>
            <SelectItem value="Transportation">Transportation</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

// eslint-disable-next-line react/display-name
const SelectItem = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: { children: any; className?: string; value?: string },
    forwardedRef: React.Ref<HTMLDivElement>
  ) => {
    return (
      <Select.Item
        value="meow"
        className={classnames("SelectItem", className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectSessionType;
