import Home from "../_components/home";
import CompletedProperty from "../_components/completed-property";
import UnderConstruction from "../_components/under-construction";
import HotProperty from "../_components/hot-property";

export default function Page() {
  return (
    <>
      <Home />
      <CompletedProperty />
      <UnderConstruction />
      <HotProperty />
    </>
  );
}
