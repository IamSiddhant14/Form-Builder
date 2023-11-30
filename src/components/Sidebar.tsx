import FormElement from "./FormElement";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div id="sidebar">

     <h1 id="heading">BLOCKS</h1>

      <FormElement name="label"  />
      <FormElement name="Input" />
      <FormElement name="Button" />
    </div>
  );
};

export default Sidebar;
