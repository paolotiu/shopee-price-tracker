import { GetServerSideProps } from "next";
import Peso from "../../../public/peso.svg";
import Question from "../../../public/question.svg";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Button } from "../../../components/General/Button";
import Layout from "../../../components/Layout";
import { MainContent } from "../../../components/MainContent/MainContent";
import ClampLines from "react-clamp-lines";
import Modal from "react-modal";

import { addPriceTarget, getOneUserItem } from "../../../utils/api";
import { ItemDetail } from "../../../components/ItemDetail/ItemDetail";
import { apiHandler } from "../../../utils/apiHandler";
import toast from "react-hot-toast";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  return {
    props: {
      id,
    },
  };
};

const customStyles: ReactModal.Styles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(43, 43, 43, 0.405)",
  },
};

interface Props {
  id: string;
}
Modal.setAppElement("#__next");
export const Item = ({ id }: Props) => {
  const { data, isLoading } = useQuery(["item", id], () => getOneUserItem(id));
  const item = data?.item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTooltipHover, setIsTooltipHover] = useState(false);
  const [target, setTarget] = useState(data?.target || 0);
  const isMobileRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function closeModal() {
    setIsModalOpen(false);
  }
  const addTarget = async (target: number) => {
    if (item) {
      const { error } = await apiHandler(addPriceTarget(item._id, target));
      if (error) {
        toast.error("There was an error in setting the price target");
        setTarget(0);
      } else {
        toast.success("Price target updated");
      }
    }
  };

  useEffect(() => {
    // device detection
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      isMobileRef.current = true;
    }
    setTarget(data?.target || 0);
  }, []);
  useEffect(() => {
    const btn = document.querySelector(".clamp-lines__button");
    if (btn) {
      btn.classList.add("text-gray-400", "dark:text-gray-300");
    }
  }, [isLoading]);
  return (
    <Layout title={item?.name} showLogo={false} showLogin={false}>
      <MainContent showBottomBlob={isMobileRef.current}>
        <div className="flex justify-center px-3 ">
          <div className="flex flex-col justify-between w-full max-w-screen-md pb-10">
            <div>
              <h1 className="text-2xl font-bold">{item?.name}</h1>
              {item?.description && (
                <ClampLines
                  text={item?.description}
                  id="description"
                  lines={3}
                  innerElement="p"
                  className="py-4 mt-3 text-sm leading-7 whitespace-pre-wrap"
                />
              )}
            </div>
            <hr />

            <div
              className="grid grid-cols-2 py-4 md:text-lg gap-x-4 gap-y-4 sm:gap-y-7 sm:grid-cols-3 whitespace-nowrap"
              // style={{
              //   gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              // }}
            >
              <ItemDetail
                img="/free_shipping.svg"
                title="Free Shipping:"
                detail={item?.free_shipping ? "Yes" : "No"}
              />
              <ItemDetail
                img="/discount.svg"
                title="Discount:"
                detail={item?.discount ? item.discount + "%" : "None"}
              />
              <ItemDetail
                img="/star.svg"
                title="Rating:"
                detail={
                  item?.avg_rating
                    ? Math.round(item?.avg_rating * 100) / 100
                    : ""
                }
              />
              <ItemDetail
                img="/sold.svg"
                title="Sold:"
                detail={item?.historical_sold}
              />
              <ItemDetail
                img="/heart.svg"
                title="Likes:"
                detail={item?.likes}
              />
              <ItemDetail img="/eye.svg" title="Views:" detail={item?.views} />
            </div>
            <hr />
            <div className="grid gap-2 py-10 font-bold ">
              <p>
                Current Price:{"  "}
                <span className="text-primary">P{item?.price}</span>
              </p>
              <p>
                Lowest Price:{"  "}
                <span className="text-accent">P{item?.lowest_price}</span>
              </p>
              <p
                className={
                  target
                    ? "text-black dark:text-white transition duration-1000 relative max-w-min whitespace-nowrap"
                    : "text-gray-400 transition duration-1000 relative max-w-min whitespace-nowrap"
                }
              >
                Price Target:{" "}
                {target ? (
                  <span className="text-green-300"> P{target} </span>
                ) : (
                  ""
                )}
                <span
                  onMouseOver={() =>
                    isMobileRef.current ? "" : setIsTooltipHover(true)
                  }
                  onMouseLeave={() => setIsTooltipHover(false)}
                  onClick={() => setIsTooltipHover(!isTooltipHover)}
                >
                  <Question
                    className="absolute w-3 cursor-pointer fill-current -top-1 -right-4"
                    style={{ color: "inherit" }}
                  />
                </span>
                <span
                  className={`absolute h-auto p-2 text-xs font-normal text-white break-words whitespace-normal transform translate-x-full -translate-y-full rounded bg-black-lighter w-28 -top-1 -right-4 bg-opacity-70 ${
                    isTooltipHover ? "block" : "hidden"
                  }`}
                >
                  Get alerted when this item reaches your price target!
                </span>
              </p>
            </div>
            <div className="flex justify-between w-full">
              <Button
                accent
                filled
                onClick={() => setIsModalOpen(true)}
                aria-label="add price target"
              >
                Add A Target
              </Button>
              <a href={item?.urls[0]} target="_blank">
                <Button aria-label="Visit shop" accent>
                  Visit Shop
                </Button>
              </a>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              if (inputRef.current) {
                const target = parseInt(inputRef.current.value);
                setTarget(target);
                addTarget(target);
              }
              closeModal();
            }}
            className="flex items-center"
          >
            <span className="inline-flex items-center py-1 pl-3 pr-1 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm rounded-l-md">
              <Peso
                width="14px"
                height="16px"
                className="text-gray-500 fill-current "
              />
            </span>
            <input
              ref={inputRef}
              type="number"
              min={1}
              max={item?.price ? item.price - 1 : ""}
              className="pl-1 text-black outline-none focus:ring-1 focus:ring-primary"
              defaultValue={target}
            />
            <Button
              type="submit"
              className="py-1 ml-5 mr-3text-base h-9 dark:bg-primary"
            >
              Add Target
            </Button>
          </form>
        </Modal>
      </MainContent>
    </Layout>
  );
};

export default Item;
