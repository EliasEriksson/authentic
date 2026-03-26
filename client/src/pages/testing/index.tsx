import * as React from "react";
import { Select } from "../../components/molecules/Select";
import { SelectOption } from "../../components/molecules/Select/Option";

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
