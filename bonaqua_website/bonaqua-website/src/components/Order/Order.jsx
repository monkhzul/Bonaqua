import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import sags from "../../images/svg/order 1/sagsnii medelel.svg";
import add from '../../images/svg/order 1/nemelt zahialga.svg';
import bona from '../../images/bona0.5.png';
import flower from '../../images/svg/order 1/tsetseg jijig.svg';
import addButton from '../../images/svg/order 1/+.svg';
import removeButton from '../../images/svg/order 1/-.svg';
import deleteButton from '../../images/svg/order 1/x.svg';
import bigflower from '../../images/svg/home/tsetseg tom.svg';
import { AppContext } from "../../App";
import { Modal, Button } from 'react-bootstrap';
import SlideImage from "../SlideImage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Social from "../Social";

export default function Order() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [render, setRender] = useState(false);
  const [image, setImage] = useState(bona);

  const { setTotal, value } = useContext(AppContext);

  // Баазаас мэдээлэл авах
  useEffect(() => {
    var getData = async () => {
      try {
        var data = await fetch('http://localhost:8090/api/bonaqua');
        var resData = await data.json();
        setData(resData)
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [])

  const number = Array(10).fill(0).map((e, i) => i + 1);

  // Захиалгын мэдээлэл
  const arrays = sessionStorage.getItem("array");
  var orderArray = JSON.parse(arrays);
  let sum = sessionStorage.getItem("sum");
  let item = sessionStorage.getItem("item");

  window.onload = () => {
    const p = document.getElementById('mlselect').value.split(',')[1];
    const incase = document.getElementById('mlselect').value.split(',')[2];
    const n = document.getElementById('avdar').value;
    const result = document.getElementById('result');

    result.innerHTML = `${p * incase * n}₮`;
    // setRender(!render)
  }

  // Нэмэлт захиалгын хэсэг /утга авах/
  function setValue() {
    const size = document.getElementById('mlselect').value.split(',')[0];
    const price = document.getElementById('mlselect').value.split(',')[1];
    const incase = document.getElementById('mlselect').value.split(',')[2];
    const number = document.getElementById('avdar').value;
    const result = document.getElementById('result');

    const imgArr = JSON.parse(sessionStorage.getItem("imagearray"));

    const totals = (incase * price) * number;
    sessionStorage.setItem('total', totals);
    result.innerHTML = `${totals}₮`;

    imgArr.map((img, i) => {
      if (img.size == size) {
        setImage(img.img)
        console.log(img.size)
      }
    })
  }
  if (orderArray == null) {
    orderArray = [];
  }

  // Захиалга нэмэх
  function Busket() {
    const size = document.getElementById('mlselect').value.split(',')[0];
    const prices = document.getElementById('mlselect').value.split(',')[1];
    const incase = document.getElementById('mlselect').value.split(',')[2];
    const article = document.getElementById('mlselect').value.split(',')[3];

    const bagts = parseInt(document.getElementById('avdar').value);
    const totalPrice = prices * incase * bagts;

    var index = orderArray.findIndex(x => x.size == size);

    if (totalPrice > 0) {
      index === -1 ? orderArray.push({
        size: size,
        sprice: prices,
        price: prices * incase * bagts,
        tincase: incase * bagts,
        incase: incase,
        avdar: bagts,
        article: article,
        image: image
      })
        : orderArray.forEach(e => {
          if (e.size == size) {
            e.price += (prices * incase) * bagts;
            e.tincase += (incase * bagts);
            e.avdar += bagts;
          }
        })
      var c = 1;
      orderArray.forEach(x => {
        if (x.size != size) {
          c += 1;
        }
      });
      sessionStorage.setItem("item", c);
    }
    else {
      toast("Уучлаарай cагслах боломжгүй байна. Үнийн дүн 0-ээс их байх хэрэгтэй!")
    }

    sessionStorage.setItem("array", JSON.stringify(orderArray));
    var sum = 0;
    orderArray.forEach(x => {
      sum += x.price;
    });

    sessionStorage.setItem("sum", sum);
    setTotal(sum)

    setRender(!render)
  }

  // Захиалгын доод хэмжээ шалгах
  function Ordering() {
    const min = 100000;
    if (sum < min) {
      setShow(true);
    }
    else {
      window.location.pathname = '/userinfo';
    }
  }

  const handleClose = () => setShow(false);

  // Захиалга устгах
  function removeOrder(element) {
    const index = orderArray.indexOf(element);

    if (index > -1) {
      orderArray.splice(index, 1);
      sessionStorage.setItem("array", JSON.stringify(orderArray));
      sum -= element.price;
      sessionStorage.setItem("sum", sum);
      setTotal(sum)
      item -= 1;
      sessionStorage.setItem("item", item);
    }
    setRender(!render)
  }

  var fprice = [];
  const fincase = [];

  data.forEach(x => {
    fprice.push(x.BPrice)
    fincase.push(x.InCase)
  })
  var ftotal = fprice[0] * fincase[0];

  return (
    <div className="mx-auto flex flex-col justify-between">
      <div className="flex flex-col xl:flex-row">
        <div className="w-full xl:w-1/2 flex relative choosing">
          <SlideImage />
        </div>

        <div className="order1Content w-full xl:w-1/2 flex flex-col justify-between">
          <div className="orderInfo flex flex-col justify-between">
            <h1 className="mb-4 9xl:text-8xl">Миний сагс</h1>
            <div className="flex productInfo">
              <img src={sags} alt="" className="w-full" />
            </div>
            {/* Захиалгын хэсэг */}
            <div className="zahialga flex flex-wrap justify-between">
              {orderArray == '' ? <div className="w-full flex justify-center my-10">
                <img src={flower} alt="" className='mx-3 -mt-4 emptyFlower' />
                <p className="text-lg text-gray-500 font-medium">Таны сагс хоосон байна!</p>
              </div>
                : orderArray.map(data =>
                  <div className="zahialsanHeseg my-1 9xl:my-40">

                    <div className="order1 flex">
                      <div className="order1Img flex justify-center">
                        <img src={data.image} alt="" className="" />
                      </div>

                      <div className="order1Info p-2">
                        <div className="orderName">
                          <div className="flex justify-between w-full">
                            <h6 className="9xl:text-4xl">Bonaqua {data.size} </h6>
                            <img src={deleteButton} onClick={() => removeOrder(data)} id="remove" alt="" className="cursor-pointer" />
                          </div>
                          <p className="text-sm 9xl:text-3xl 9xl:mt-3">Ширхэгийн тоо: {data.tincase} ширхэг</p>
                        </div>

                        <div className="order1Price flex justify-between items-center">
                          <h3 className="9xl:text-5xl">{data.price}₮ </h3>
                          <div className="order1Button flex justify-between">
                            <button className="" onClick={() => {
                              if (data.avdar > 1 && sum > 0) {
                                data.avdar -= 1;
                                data.tincase -= parseInt(data.incase);
                                data.price -= parseInt(data.incase) * parseInt(data.sprice);
                                sum -= parseInt(data.incase) * parseInt(data.sprice);
                              }
                              sessionStorage.setItem("array", JSON.stringify(orderArray));
                              sessionStorage.setItem("sum", sum);
                              setTotal(sum)
                              setRender(!render)
                            }}>
                              <img src={removeButton} alt="" className="9xl:w-14" />
                            </button>
                            <p className="font-semibold 9xl:text-5xl" id="count">{data.avdar}</p>
                            <button onClick={() => {
                              data.avdar += 1;
                              data.tincase += parseInt(data.incase);
                              data.price += parseInt(data.incase) * parseInt(data.sprice);
                              sessionStorage.setItem("array", JSON.stringify(orderArray));
                              var sum = 0;
                              orderArray.forEach(x => {
                                sum += x.price;
                              });

                              sessionStorage.setItem("sum", sum);
                              setTotal(sum)
                              setRender(!render)
                            }}>
                              <img src={addButton} alt="" className="9xl:w-14" />
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                )}

            </div>

            <div className="flex zahialahHusnegt">
              <div className="seeTotalInfo flex relative">
                <div className='order1selectTotal flex flex-col'>
                  <p className='text-gray-500 flex ml-3 text-sm 9xl:text-2xl'>Хэмжээ</p>
                  <div className="flex justify-center items-center">
                    <div className="min-w-0 flex mx-2 my-3">
                      {orderArray != null ? orderArray.map(data =>
                        <p className='total text-xl font-semibold'>{data.size}</p>
                      ) : ''}
                    </div>
                  </div>
                </div>

                <div className='order1selectTotal1 flex flex-col'>
                  <p className='text-gray-500 flex ml-3 text-sm 9xl:text-3xl'>Нийт үнэ</p>
                  {sum == 0 || sum == null ? <p className='total text-red-700 text-3xl font-semibold' id="resultO"></p>
                    : <p className='total text-red-700 text-xl md:text-3xl font-semibold' id="resultO">{sum}₮</p>}
                </div>

                <Link className="nav-link cursor-pointer" to="#" id='submit' >
                  <button className="sagslahButton text-xl 9xl:text-5xl" onClick={Ordering}>
                    Захиалах
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="addOrder">
            <div className='flex flex-col busketButton'>
              <div className="addOrdertitle my-3">
                <img src={add} alt="" className="w-full" />
              </div>

              <div className='flex'>

                <form action="" id="mlform" className='flex relative flex-col md:flex-row'>
                  <select name="ml" id="mlselect" className='select' onChange={setValue}>
                    {data.map((res) =>
                      <option id="incase" value={[res.Capacity, res.BPrice, res.InCase, res.Article]}>{res.Capacity}</option>
                    )}
                  </select>

                  <input type="number" list="case" id="avdar" className='select' onChange={setValue} placeholder="Авдарны тоо" defaultValue="1" />
                  <datalist id='case'>
                    {number.map(res =>
                      <option value={res} id='number'></option>
                    )}
                  </datalist>

                  <div className='selectTotal flex justify-center items-center text-center'>
                    <p className='total text-red-700 pt-4 9xl:text-3xl' id='result'>
                      {ftotal}₮
                    </p>
                  </div>
                  <div className='tablenames absolute flex flex-col md:flex-row text-sm 9xl:text-3xl mt-1'>
                    <div className='tablename1'>
                      <p className=''>Хэмжээ</p>
                    </div>
                    <div className='tablename2'>
                      <p className=''>Авдар</p>

                    </div>
                    <div className='tablename3'>
                      <p className=''>Нийт үнэ</p>
                    </div>
                  </div>

                  <Link className="nav-link" to="#" id='submit' onClick={Busket}>
                    <ToastContainer />
                    <button className="sagslahButton text-xl 9xl:text-5xl" id='fly'>
                      Захиалга нэмэх
                    </button>
                  </Link>

                </form>
              </div>

            </div>
            <p className="font-semibold flex justify-end 9xl:text-4xl 9xl:mt-2">Захиалгын доод хэмжээ: 100,000₮</p>
          </div>
        </div>

        <Social />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <p className='text-gray-900'>Нийт үнийн дүн захиалгын доод хэмжээнд хүрэхгүй байна! Захиалгын доод хэмжээ: 100.000 төгрөг</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
