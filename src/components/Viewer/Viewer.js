import "prism-themes/themes/prism-vsc-dark-plus.css";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";

const Viewer = ({ html }) => {
  return (
    <div
      className="pt-8 pb-11 max-w-none prose prose-a:text-blue-400 prose-img:m-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};

export default Viewer;
