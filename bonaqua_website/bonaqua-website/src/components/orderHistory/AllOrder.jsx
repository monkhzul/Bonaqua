import React from "react";
import bona from '../../images/bona0.5.png';

export default function AllOrder() {

  const userarrays = sessionStorage.getItem("userarray");
  const userArray = JSON.parse(userarrays);

  const dugaarc = sessionStorage.getItem("dugaar");

  return (
    <div className="orderHistory flex">
      <div className="orderHistoryImg flex justify-center">
        <img src={bona} alt="" className="" />
      </div>
      {/* { userArray.map(data =>  */}
      <div className="orderHistoryInfo p-1 flex justify-between w-full mx-2 9xl:mx-8 my-2 items-center 9xl:text-3xl">
        <div className="date leading-3">
          <p className="text-gray-500 9xl:text-3xl">Огноо</p>
          <p className="font-semibold 9xl:text-3xl leading-5"></p>
          {/* <p className="font-semibold">15:34</p> */}
        </div>
        <div className="state mx-3">
          <p className="text-gray-500">Төлөв</p>
          <p className="font-semibold">Баталгаажсан</p>
        </div>
        <div className="orderNumber mx-3">
          <p className="text-gray-500 leading-3">Захиалгын дугаар</p>
          <p className="font-semibold">{dugaarc}</p>
        </div>
        <div className="amount">
          <p className="text-gray-500">Дүн</p>
          <p className="font-semibold">₮</p>
        </div>
      </div>
      {/* //   )
    // } */}

    </div>
  )
}
