import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import tw from "twin.macro";
import Dots from "../../public/dots.svg";
import { deleteUserItem } from "../../utils/api";
import { apiHandler } from "../../utils/apiHandler";
import { useIsMobile } from "../../utils/useIsMobile";

const ListItem = tw.li`px-3 py-2 list-none border bg-white rounded-sm  whitespace-nowrap font-semibold hover:bg-white-pure cursor-pointer transition-colors duration-150  `;
import { motion, Variants } from "framer-motion";
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
      toast.error(error.message);
    } else {
      router.push("/home");

      toast.success("Item deleted");
    }
  };
  const parentVariants: Variants = {
    closed: {
      display: "none",
      transition: {
        delay: 0.1,
        when: "afterChildren",
      },
    },
    open: { display: "block" },
  };

  const childrenVariants: Variants = {
    closed: {
      scale: 0.1,
      x: -30,
      y: 0,
    },
    open: {
      scale: 1,
      x: -100,
      y: 70,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
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
      <motion.div
        animate={isClicked ? "open" : "closed"}
        variants={parentVariants}
      >
        <motion.ul
          animate={isClicked ? "open" : "closed"}
          variants={childrenVariants}
          tw="absolute bottom-0 text-sm text-black bg-white rounded left-1"
        >
          <ListItem aria-label="copy link" tw="border-b-0" onClick={copyLink}>
            Copy Link
          </ListItem>
          <ListItem
            aria-label="delete item"
            tw="text-red-400"
            onClick={deleteItem}
          >
            Delete
          </ListItem>
        </motion.ul>
      </motion.div>
    </div>
  );
};
