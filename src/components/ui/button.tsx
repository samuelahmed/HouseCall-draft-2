import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  " cursor-pointer hover:outline inline-flex items-center justify-center text-olive2 active:outline-darkOlive2 active:text-darkOlive2",
  {
    variants: {
      variant: {
        default: "bg-blue10 hover:outline-blue4 active:bg-blue5",
        redButton: "bg-red11 hover:outline-blue4 active:bg-red5",
      },
      size: {
        default: "h-4 py-2 px-2 hover:outline-2 -outline-offset-4",
        sm: "text-xs h-2 px-1 py-1 hover:outline-1 -outline-offset-2",
        lg: "text-lg h-6 py-3 px-3 hover:outline-2 -outline-offset-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
