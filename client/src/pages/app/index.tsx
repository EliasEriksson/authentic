import Select from "../../components/Select/index.tsx";
import { Option } from "../../components/Option/index.tsx";

export const App = () => {
  return (
    <>
      <p>app index</p>
      <span>Fruits</span>
      <Select name={"selector"} initialValue={"apple"}>
        <Option value={"apple"} searchTerms={["fruit"]}>
          Apple
        </Option>
        <Option value={"orange"} searchTerms={["fruit", "citrus"]}>
          Orange
        </Option>
        <Option value={"lemon"} searchTerms={["fruit", "citrus"]}>
          Lemon
        </Option>
      </Select>
    </>
  );
};
export default App;
