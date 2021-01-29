import React from "react";
import MagGlass from "public/magnifying_glass.svg";

interface Props {
  url: string;
  setUrl: (string: string) => void;
  searchItem: () => void;
}

const Searchbar: React.FC<Props> = ({ url, setUrl, searchItem }) => {
  const pasteToInput = () => {
    navigator.clipboard.readText().then((text) => {
      setUrl(text);
    });
  };

  return (
    <div className="relative flex justify-center w-full h-full rounded md:w-5/6 place-self-center">
      <div className="relative flex items-center h-full input-wrapper">
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          className="w-full max-w-xl p-2 pl-10 overflow-hidden text-black outline-none overflow-ellipsis focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://shopee.ph/example-product"
        />
        <img
          src="https://img.icons8.com/ios/50/000000/paste.png"
          onClick={pasteToInput}
          className="absolute text-gray-400 transition duration-500 ease-in transform -translate-y-1/2 fill-current max-w-min h-1/2 top-1/2 left-2"
        />
        <button
          className={
            "h-full px-2 rounded-r-lg bg-accent disabled:bg-gray-300 transition duration-500 "
          }
          disabled={!url}
          onClick={searchItem}
        >
          <MagGlass
            id="mag-glass"
            className={
              url
                ? "text-black transition duration-500 ease-in fill-current max-w-min h-1/2"
                : "text-gray-500 transition duration-500 ease-in fill-current max-w-min h-1/2"
            }
          />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
