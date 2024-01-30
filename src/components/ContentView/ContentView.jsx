import './style.scss';
import parse from "html-react-parser";

export const ContentView = ({ layout, contentRef }) => {
  return (
    <div ref={contentRef} className="content">
      {parse(layout)}
    </div>
  )
}