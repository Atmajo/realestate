import Home from "../_components/home";
import CompletedProperty from "../_components/completed-property";
import UnderConstruction from "../_components/under-construction";

export default function Page() {
  return (
    <>
      <Home />
      <div className=" bg-gradient-to-br from-white to-sky-200">
        <CompletedProperty />
        <UnderConstruction />
      </div>
    </>
  );
}
