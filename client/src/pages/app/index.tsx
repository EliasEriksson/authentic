import Select from "../../components/Select/index.tsx";
import { Option } from "../../components/Option/index.tsx";

export const App = () => {
  return (
    <>
      <p>about</p>
      <Select name={"selector"} initialValue={"hello"}>
        <Option value={"hello"}>hello</Option>
        <Option value={"world"}>world</Option>
      </Select>
    </>
  );
};
export default App;
