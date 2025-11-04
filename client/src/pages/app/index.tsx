import Select from "../../components/Select/index.tsx";
import { SelectOption } from "../../components/SelectOption/index.tsx";

export const App = () => {
  return (
    <>
      <p>Page on my site</p>
      <span>Fruits</span>
      <Select name={"selector"} initialValue={"apple"}>
        <SelectOption value={"apple"} searchTerms={["fruit"]}>
          Apple
        </SelectOption>
        <SelectOption value={"orange"} searchTerms={["fruit", "citrus"]}>
          Orange
        </SelectOption>
        <SelectOption value={"lemon"} searchTerms={["fruit", "citrus"]}>
          Lemon
        </SelectOption>
        <SelectOption value={"pineapple"} searchTerms={["fruit", "exotic"]}>
          Pineapple
        </SelectOption>
      </Select>
      <p>Testing</p>
    </>
  );
};
export default App;
