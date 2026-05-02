import { BaseLayout } from "../BaseLayout";
import { Navigation } from "../../features/Navigation";

export function MainLayout() {
  return <BaseLayout aside={{ content: <Navigation /> }} />;
}
