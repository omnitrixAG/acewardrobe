import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative group border text-foreground mx-auto text-center rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary/5 hover:bg-primary/0 border-primary/20",
        solid: "bg-primary hover:bg-primary/90 text-primary-foreground border-transparent hover:border-foreground/50",
        ghost: "border-transparent bg-transparent hover:border-border hover:bg-muted/10",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 border-transparent",
        outline: "border-border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
        link: "text-primary underline-offset-4 hover:underline border-transparent",
      },
      size: {
        default: "px-7 py-2 text-sm",
        sm: "px-4 py-1.5 text-xs",
        lg: "px-10 py-3 text-base",
        icon: "h-10 w-10",
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
  neon?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, neon = true, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {/* Top neon glow line */}
        <span
          className={cn(
            "absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent hidden",
            neon && "block"
          )}
        />
        {children}
        {/* Bottom neon glow line */}
        <span
          className={cn(
            "absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent hidden",
            neon && "block"
          )}
        />
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
