import { useState } from "react";
import clsx from "clsx";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";

const ProductItem = ({ id, item, labelItem, addProduct, removeProduct }) => {
  const [count, setCount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const incrementHandler = () => {
    setCount((prevState) => prevState + 1);
    if (isAdded) {
      addProduct(item?.referenceCode, count + 1);
    }
  };

  const decrementHandler = () => {
    if (count > 1) {
      setCount((prevState) => prevState - 1);
      addProduct(item?.referenceCode, count - 1);
    } else {
      setCount(0);
      setIsAdded(false);
      removeProduct(item?.referenceCode);
    }
  };

  const addHandler = () => {
    if (count > 0) {
      setIsAdded(true);
      addProduct(item?.referenceCode, count);
    }
  };

  const removeHandler = () => {
    setCount(0);
    setIsAdded(false);
    removeProduct(item?.referenceCode);
  };

  return (
    <div className={clsx(isAdded ? "bg-green-100" : "bg-gray-100", "flex flex-row justify-between my-4 p-2")} id={id}>
      <span>
        <span className="font-bold">{labelItem}: </span>
        <span>{item?.referenceCode}</span>
      </span>
      <div className="flex flex-row items-center space-x-4">
        <button
          onClick={incrementHandler}
          type="button"
          className="border-[1px] rounded-md bg-white p-2 text-black shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="mx-2">{count}</div>
        <button
          onClick={decrementHandler}
          type="button"
          className="border-[1px] rounded-md bg-white p-2 text-black shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <MinusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        {!isAdded ? (
          <button
            onClick={addHandler}
            type="button"
            className="border-[1px] rounded-md bg-white p-2 text-black shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Añadir
          </button>
        ) : (
          <button
            onClick={removeHandler}
            type="button"
            className="border-[1px] rounded-md bg-white p-2 text-black shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Elimnar
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
