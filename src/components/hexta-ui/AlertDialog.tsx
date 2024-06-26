import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";

const cn = (...args: any[]) => {
  return twMerge(clsx(args));
};

interface AlertDialogProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  isOpen: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const AlertDialog = ({
  isOpen,
  className,
  children,
  ...rest
}: AlertDialogProps) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "anticipate" }}
            className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-screen h-screen bg-black alert-dialog-backdrop z-[9999] bg-opacity-80"
          >
            <div
              className={cn(
                "flex flex-col gap-3 px-10 bg-black border border-b-2 rounded-lg alert-dialog p-7 border-zinc-900  max-w-[20rem] mx-2",
                className
              )}
              {...rest}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface AlertDialogTitleProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: React.ReactNode;
  className?: string;
}

export const AlertDialogTitle = ({
  children,
  className,
  ...rest
}: AlertDialogTitleProps) => {
  return (
    <p
      className={cn("text-2xl font-bold tracking-tight leading-6", className)}
      {...rest}
    >
      {children}
    </p>
  );
};

interface AlertDialogContentProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: React.ReactNode;
  className?: string;
}

export const AlertDialogContent = ({
  children,
  className,
  ...rest
}: AlertDialogContentProps) => {
  return (
    <p className={cn("text-[14px] opacity-80", className)} {...rest}>
      {children}
    </p>
  );
};

interface AlertDialogButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  action: () => void;
  variant?: "primary" | "secondary";
}

export const AlertDialogButton = ({
  label,
  action,
  variant = "primary",
  ...rest
}: AlertDialogButtonProps) => {
  const primaryClasses = `grow  text-center items-center  justify-center px-[20px] py-[8px] bg-white border border-zinc-900 text-black rounded-lg flex items-center font-[600] text-[14px] transition-all duration-[0.1s] hover:brightness-90`;
  const secondaryClasses =
    "grow  text-center items-center  justify-center px-[20px] py-[8px] bg-zinc-950 bg-opacity-20 border border-zinc-900 text-white rounded-lg flex items-center font-[600] text-[14px] transition-all duration-[0.1s] hover:brightness-90";

  return (
    <button
      className={variant === "primary" ? primaryClasses : secondaryClasses}
      onClick={action}
      {...rest}
    >
      {label}
    </button>
  );
};

interface AlertDialogButtonsProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttons: {
    label: string;
    action: () => void;
    variant?: "primary" | "secondary";
  }[];
}

export const AlertDialogButtons = ({
  buttons,
  ...rest
}: AlertDialogButtonsProps) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {buttons.map((button, index) => (
        <AlertDialogButton
          {...rest}
          key={index}
          label={button.label}
          action={button.action}
          variant={button.variant}
        />
      ))}
    </div>
  );
};
