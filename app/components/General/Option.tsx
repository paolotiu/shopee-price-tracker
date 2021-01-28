import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import tw from "twin.macro";
import Dots from "../../public/dots.svg";
import { deleteUserItem } from "../../utils/api";
import { apiHandler } from "../../utils/apiHandler";
import { useIsMobile } from "../../utils/useIsMobile";

const ListItem = tw.li`px-3 py-2 list-none border bg-white rounded-sm border-b-0 whitespace-nowrap font-semibold hover:bg-white-pure cursor-pointer transition-colors duration-150  `;

interface Props {
  id: string;
}

export const Option = ({ id }: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  useEffect(() => {
    const close = () => {
      setIsClicked(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);
  const copyLink = () => {
    navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_CLIENT_URL + "/item/" + id
    );
    toast.success("Link copied to clipboard!");
  };

  const deleteItem = async () => {
    const { error } = await apiHandler(deleteUserItem(id));
    if (error) {
      console.log(error);
    } else {
      router.push("/home");

      toast.success("Item deleted");
    }
  };

  return (
    <div className="relative" style={{ height: "min-content" }}>
      <button
        aria-label="options"
        onClick={(e) => {
          e.stopPropagation();
          setIsClicked(!isClicked);
        }}
      >
        <Dots
          css={[
            tw`w-8 h-auto transition duration-1000 fill-current`,
            isMobile
              ? tw`text-accent dark:text-accent-dark`
              : tw`xl:text-accent xl:dark:text-accent-dark text-primary dark:text-primary-dark`,
          ]}
        />
      </button>

      <ul
        css={[
          tw`absolute bottom-0 px-0 text-sm text-black transform -translate-x-full translate-y-full bg-white rounded left-1`,
          isClicked ? tw`block` : tw`hidden`,
        ]}
      >
        <ListItem aria-label="copy link" onClick={copyLink}>
          Copy Link
        </ListItem>
        <ListItem
          aria-label="delete item"
          tw="text-red-400"
          onClick={deleteItem}
        >
          Delete
        </ListItem>
      </ul>
    </div>
  );
};
