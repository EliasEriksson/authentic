import { type PropsWithChildren, type ReactNode, useState } from "react";
import { Collapse } from "../Collapse";
import { Button } from "../Button";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import styles from "./styles.module.scss";
import { css } from "../../../utils";

export namespace Accordion {
  export interface Props {
    summary: ReactNode | null | undefined;
  }
}

export function Accordion({
  children,
  ...props
}: PropsWithChildren<Accordion.Props>) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={css(styles.accordion, { [styles.open]: open })}>
      <Button
        subgrid
        className={styles.button}
        onClick={() => setOpen((open) => !open)}
      >
        <div className={styles.summaryWrapper}>
          <div>icon</div>
          <div className={styles.summary}>{props.summary}</div>
          <div className={styles.chevron}>
            <ChevronRightIcon />
          </div>
        </div>
      </Button>
      <Collapse
        subgrid
        open={open}
        direction={"top-to-bottom"}
        className={styles.collapse}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.contentLine} />
          <div className={styles.content}>{children}</div>
        </div>
      </Collapse>
    </div>
  );
}
