import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  " text-lg cursor-pointer hover:outline hover:outline-2 inline-flex items-center justify-center ",
  {
    variants: {
      variant: {
        default:
          "bg-blue10  text-olive2  hover:outline-blue4 active:bg-blue5 active:text-darkOlive2 dark:bg-darkBlue7",
        // destructive:
        //   "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // outline:
        //   "border border-input hover:bg-accent hover:text-accent-foreground",
        // secondary:
        //   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // ghost: "hover:bg-accent hover:text-accent-foreground",
        // link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-4 py-2 px-2",
        // sm: "h-9 px-3 rounded-md",
        // lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const borderVariants = cva("", {
  variants: {
    bVariant: {
      default: "bg-blue10 dark:bg-darkBlue7",
      //   destructive:
      //     "border border-input hover:bg-accent hover:text-accent-foreground",
    },
    bSize: {
      default: "h-10 px-1 py-1",
      //   sm: "h-9 px-3 rounded-md",
      //   lg: "h-11 px-8 rounded-md",
    },
  },
  defaultVariants: {
    bVariant: "default",
    bSize: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    VariantProps<typeof borderVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { bVariant, bSize, className, variant, size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const Comp2 = asChild ? Slot : "div";

    return (
      <>
        <Comp2 className={cn(borderVariants({ bVariant, bSize, className }))}>
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        </Comp2>
      </>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, borderVariants };
