const ThumbnailModal = ({
  toggle,
  thumbnailList,
  currentThumbnail,
  setThumbnail,
}) => {
  const selectThumbnail = (url) => {
    setThumbnail(url);
    toggle();
  };

  return (
    <div className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] w-[50%] h-[80%] bg-white rounded-md shadow-sm border-2 bg-scroll overflow-y-scroll">
      <div className="w-full flex flex-row-reverse h-12 mb-2">
        <div>
          <button
            type="button"
            onClick={toggle}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-extrabold rounded-lg text-sm px-4 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Close
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 mx-10 justify-center">
        {thumbnailList.map((el, index) => {
          return (
            <div
              className={`m-2 ${
                currentThumbnail === el
                  ? "rounded outline outline-4 outline-blue-500"
                  : "hover:outline-gray-400 hover:rounded hover:outline hover:outline-4"
              }`}
              key={index}
              onClick={() => selectThumbnail(el)}
            >
              <img
                className={`object-cover w-full border-2 h-52 rounded-sm `}
                src={el}
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThumbnailModal;
