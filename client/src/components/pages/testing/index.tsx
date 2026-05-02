import * as React from "react";
import { Select } from "../../common/Select";
import { SelectOption } from "../../common/Select/Option";

export const Testing: React.FC = () => {
  return (
    <>
      <Select name={"testing"}>
        <SelectOption value={"hello"}>
          hellaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaao
          {/*hello*/}
        </SelectOption>
        <SelectOption value={"there"}>there</SelectOption>
      </Select>
    </>
  );
};
export default Testing;
