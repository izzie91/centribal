import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";

const OrderItem = ({ id, item, labelItem, addProduct }) => {
  const [count, setCount] = useState(item?.count);

  const incrementHandler = () => {
    setCount((prevState) => prevState + 1);
    addProduct(item?.referenceCode, count + 1);
  };

  const decrementHandler = () => {
    if (count > 1) {
      setCount((prevState) => prevState - 1);
      addProduct(item?.referenceCode, count - 1);
    }
  };

  return (
    <div id={id} className="flex flex-row justify-between my-4 bg-gray-100 p-2">
      <span>
        <span className="font-bold">{labelItem}: </span>
        <span>{item?.referenceCode}</span>
      </span>
      <div className="w-32 flex flex-row items-center space-x-4">
        <button
          onClick={incrementHandler}
          type="button"
          className="border-[1px] rounded-md bg-white p-2 text-black shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div>{count}</div>
        <button
          onClick={decrementHandler}
          type="button"
          className="border-[1px] rounded-md bg-white p-2 text-black shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <MinusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
