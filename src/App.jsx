import "./style.scss";
import { ContentView } from "./components/ContentView/ContentView";
import { EditorForm } from "./components/EditorForm/EditorForm";
import { useRef, useState } from "react";

function App() {
  const [layout, setLayout] = useState("");
  const contentRef = useRef();
  const setElement = (el) => {
    setLayout(el);
  };

  return (
    <section className="wrapper">
      <ContentView contentRef={contentRef} layout={layout} />
      <EditorForm contentRef={contentRef} setElement={setElement} />
    </section>
  );
}

export default App;
