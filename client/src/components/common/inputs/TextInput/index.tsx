import {
  type ComponentPropsWithoutRef,
  type FormEvent,
  forwardRef,
} from "react";
import { css } from "../../../../utils";

export namespace TextInput {
  export type Props = Omit<ComponentPropsWithoutRef<"input">, "onInput"> & {
    onInput?: (event: FormEvent<HTMLInputElement>, value: string) => void;
  };
}

export const TextInput = forwardRef<HTMLInputElement, TextInput.Props>(
  function TextInput({ className, onInput, ...props }, ref) {
    return (
      <input
        {...props}
        ref={ref}
        className={css(className)}
        onInput={
          !onInput
            ? undefined
            : (event) => {
                onInput(event, event.currentTarget.value);
              }
        }
      />
    );
  },
);
