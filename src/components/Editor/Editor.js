import { Editor as UiEditor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import ThumbnailModal from "../ThumbnailModal/ThumbnailModal";
import useEditor from "./../../hooks/useEditor";

const Editor = ({ title, body, slug, category, description, tags, edit }) => {
  const editorTools = useEditor({
    _category: category,
    _description: description,
    _slug: slug,
    _title: title,
    _tags: tags,
  });
  return (
    <div>
      <div className="flex">
        <div className="flex-1 w-64">
          <div className="pt-3 pl-6">
            <input
              onChange={editorTools.handleTitle}
              value={editorTools.title}
              placeholder="제목"
              className="border-gray-500 border-b-2 text-2xl"
              size={40}
              type={"text"}
            ></input>
          </div>
          <div className="pt-3 pb-4 pl-6 flex">
            <div>
              <input
                onChange={editorTools.handleSlug}
                value={editorTools.slug}
                placeholder="URL SLUG"
                className="border-gray-500 border-b-2"
                size={40}
                type={"text"}
              ></input>
            </div>
            <div className="pl-2">
              <input
                onChange={editorTools.handleDescription}
                value={editorTools.description}
                placeholder="DESCRIPTION"
                className="border-gray-500 border-b-2"
                size={40}
                type={"text"}
              ></input>
            </div>
          </div>
        </div>
        <div className="flex-1 w-64">
          <div>
            <button className="text-gray-900 bg-white border border-gray-300  hover:bg-gray-100 font-medium rounded-lg text-lg px-2 py-2 mr-2 hover:cursor-not-allowed">
              썸네일 지정
            </button>
            {edit ? (
              <button
                onClick={editorTools.handleModifySubmit}
                className="text-gray-900 bg-white border border-gray-300  hover:bg-gray-100 font-medium rounded-lg text-lg px-2 py-2 mr-2"
              >
                수정하기
              </button>
            ) : (
              <button
                onClick={editorTools.handleSubmit}
                className="text-gray-900 bg-white border border-gray-300  hover:bg-gray-100 font-medium rounded-lg text-lg px-2 py-2 mr-2"
              >
                작성하기
              </button>
            )}
          </div>
          <div>
            <select
              value={editorTools.category}
              onChange={editorTools.handleCategory}
              className="border-gray-400 border-solid border rounded"
            >
              <option
                selected={editorTools.category ? false : true}
                disabled
                className="hidden"
              >
                카테고리 지정
              </option>
              {editorTools.categoryList.map((el) => {
                return (
                  <option key={el.urlSlug} value={el.urlSlug}>
                    {el.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex justify-start mt-1">
            {editorTools.tags.map((el) => (
              <div
                key={el}
                className="bg-blue-200 text-black font-semibold rounded-md ml-1 mr-1 hover:cursor-pointer"
                onClick={() => editorTools.handleDeleteTag(el)}
              >
                {el}
              </div>
            ))}
            <input
              onChange={editorTools.handleTag}
              onKeyDown={editorTools.handleAddTag}
              value={editorTools.tag}
              className="underline ml-4"
              type={"text"}
              placeholder="태그입력"
            ></input>
          </div>
        </div>
      </div>
      <div>
        <UiEditor
          ref={editorTools.editorRef}
          autofocus
          initialValue={body ? body : " "}
          initialEditType="markdown"
          previewStyle="vertical"
          height="800px"
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        ></UiEditor>
      </div>
      {editorTools.modalState && <ThumbnailModal />}
    </div>
  );
};

export default Editor;
