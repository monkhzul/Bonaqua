import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import Instruction from './ProductInformation/Instruction';
import Nutrition from './ProductInformation/Nutrition';
import Product from './ProductInformation/Product';
import water from '../images/svg/home/water 2.svg';
import sagsicon from '../images/icons/busket.svg';
import productInfo from '../images/svg/home/buteegdhuunii medeelel.svg';
import bigflower from '../images/svg/home/tsetseg tom.svg';
import bonaqua05 from '../images/546A4010.png';
import bonaqua330 from '../images/546A4006.png';
import bonaqua15 from '../images/546A4015.png';
import bonaqua45 from '../images/546A4021.png';
import bonaqua900 from '../images/546A4025.png';
import addButton from '../images/svg/order 1/+.svg';
import removeButton from '../images/svg/order 1/-.svg';
import deleteButton from '../images/svg/order 1/x.svg';
import list from '../images/svg/order 1/Ellipse -1.svg';
import { AppContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Social from './Social';
import $, { ready } from 'jquery';

export default function Content() {
  var { array, setTotal, total, setItem, setValues } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState(bonaqua15);
  const [active, setActive] = useState([]);


  const imageArray = [
    { "img": bonaqua15, "size": "1.5L" },
    { "img": bonaqua45, "size": "4.5L" },
    { "img": bonaqua900, "size": "800ml" },
    { "img": bonaqua05, "size": "500ml" },
    { "img": bonaqua330, "size": "330ml" },
    { "img": bonaqua05, "size": "18.9L" },
    { "img": bonaqua05, "size": "11.3L" },
  ];

  sessionStorage.setItem("imagearray", JSON.stringify(imageArray));

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
  }, [render])

  // Link
  const buttonElements = Array.from(document.querySelectorAll('.lists'));
  buttonElements.forEach(buttonElement => {
    buttonElement.addEventListener('click', () => {
      const activeElements = Array.from(document.querySelectorAll('.li-active'));
      activeElements.forEach(activeElement => {
        activeElement.classList.remove('li-active');
      });
      buttonElement.parentElement.classList.add('li-active');
    });
  });

  var fprice = [];
  var fsize = [];
  var ftotal;
  const fincase = [];


  data.forEach(x => {
    fprice.push(x.BPrice)
    fincase.push(x.InCase)
    fsize.push(x.Capacity)
  })
  ftotal = fprice[0] * fincase[0];
  console.log(fsize[0])

  function setValue() {
    const size = document.getElementById('mlselect').value.split(',')[0];
    const price = document.getElementById('mlselect').value.split(',')[1];
    const incase = document.getElementById('mlselect').value.split(',')[2];
    const number = document.getElementById('avdar').value;
    const title = document.getElementById('title');
    const caseinunit = document.getElementById('caseinunit');

    setTotal(incase)
    const totals = (incase * price) * number;
    sessionStorage.setItem('total', totals);
    title.innerHTML = `Bonaqua ${size} - ${price}???`;
    result.innerHTML = `${totals}???`;
    caseinunit.innerHTML = `1 ?????????? ???????????? ?????????????????? ?????? - ${incase}??`;

    imageArray.map(img => {
      if (img.size == size) {
        setImage(img.img)
        setCapacity(size)
      }
    })
  }

  // ???????????????? ?????????????? ????????
  function Busket() {
    const size = document.getElementById('mlselect').value.split(',')[0];
    const prices = document.getElementById('mlselect').value.split(',')[1];
    const incase = document.getElementById('mlselect').value.split(',')[2];
    const article = document.getElementById('mlselect').value.split(',')[3];

    const bagts = parseInt(document.getElementById('avdar').value);

    var index = array.findIndex(x => x.size == size);
    const totalPrice = prices * incase * bagts;
    console.log(bagts)

    if (totalPrice > 0) {
      index === -1 ? array.push({
        size: size,
        sprice: prices,
        price: prices * incase * bagts,
        tincase: incase * bagts,
        incase: incase,
        avdar: bagts,
        article: article,
        image: image
      })
        : array.forEach(e => {
          if (e.size == size) {
            e.price += (prices * incase) * bagts;
            e.tincase += (incase * bagts);
            e.avdar += bagts;
          }
        })

      var c = 1;
      array.forEach(x => {
        if (x.size != size) {
          c += 1;
        }
      });
      sessionStorage.setItem("item", c);
      setItem(c);
    }
    else {
      toast("?????????????????? c???????????? ?????????????????? ??????????. ?????????? ?????? 0-?????? ???? ???????? ????????????????!")
    }

    sessionStorage.setItem("array", JSON.stringify(array));
    // ???????? ??????
    var sum = 0;
    array.forEach(x => {
      sum += x.price;
    });
    sessionStorage.setItem("sum", sum);
    setTotal(sum)

    setRender(!render)
  }

  const number = Array(10).fill(0).map((e, i) => i + 1);

  let sum = sessionStorage.getItem("sum");
    // ???????????????? ????????????
    function removeOrder(element) {
      const index = array.indexOf(element);
  
      if (index > -1) {
        array.splice(index, 1);
        sessionStorage.setItem("array", JSON.stringify(array));
        sum -= element.price;
        sessionStorage.setItem("sum", sum);
        setTotal(sum)
        item -= 1;
        sessionStorage.setItem("item", item);
      }
      setRender(!render)
    }

    // var options = "<input type='text' list='case' id='avdar' className='select border' onChange={setValue} placeholder='?????????????? ??????' defaultValue='1' />"
    // function Options() {
    //   for (let i = 1; i <= 10; i++) {
    //     options += "<option value='" + i + "'>" + i + "</option>";
    //   }
    //   document.getElementById('avdar').innerHTML = options;
    // }
  
    // window.onload = (event) => {
    //   Options();
    // }

    $(document).ready(function () {
      $("#avdar").select2();
    })

  return (
    <div className='mx-auto flex flex-col justify-between'>
      <div className='flex flex-col xl:flex-row contentInfo'>

        <div className='choosing w-full xl:w-1/2 flex items-center justify-center relative'>
          <div className='choose flex justify-center self-center relative'>
            <div class="main">
              <ul>
                {data.map((res) =>
                  <li className='bonaquaType' onClick={() => {
                    setCapacity(res.Capacity)
                    imageArray.map(img => {
                      if (img.size == res.Capacity) {
                        setImage(img.img)
                      }
                    })
                    document.getElementById("lists").style.display = 'block';
                  }}>
                    <ul>
                      <li id='lists' className="9xl:text-6xl button">
                        {/* <img src={point} alt="" className=''/> */}
                        {res.Capacity}
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {/* <div className='choose'>
        {data.map((res, index) =>
          <ul>
            <li key={index} >
              <NavLink exact to={`#${res.Capacity}`} id="bonaq" className={res === active ? "current" : "nav-link"} onClick={() => {
                setCapacity(res.Capacity)
                imageArray.map(img => {
                  if (img.size == res.Capacity) {
                    setImage(img.img)
                  }
                })
                setActive(res)
              }}>
                <img src={point} alt="" id='list' className='listing' />
                <li className='lists'>{res.Capacity}</li>
              </NavLink>
            </li>
          </ul>
        )}
      </div> */}

          <div className='bona flex justify-center items-start relative'>
            <div className='flower absolute'>
              <img src={bigflower} alt="" className='bigflower' />
            </div>
            <img src={image} alt=""/>
            <div className='toirog absolute'>
              <div className='white flex justify-center items-center'>
                <div className='circle relative flex justify-center items-center'>
                  <p className='text-white text-sm font-semibold 9xl:text-4xl flex items-center' id='capaInCircle'>{capacity == '' ? fsize[0] : capacity}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className='info w-full xl:w-1/2 pl-4 flex flex-col'>
          <div className='water'>
            <img src={water} alt="" />
          </div>

          <div className='waterfor pl-3 flex flex-col justify-around'>

            <div className='sagslah'>
              <p className='font-semibold text-2xl md:text-3xl 9xl:text-6xl' id='title'>
                {`Bonaqua ${fsize[0]} - ${fprice[0]}???`}
              </p>
              <p id='caseinunit' className='text-xs md:text-base 9xl:text-4xl text-gray-500 font-medium mb-3'>1 ?????????? ???????????? ?????????????????? ?????? - {fincase[0]}??</p>
              <div className='flex inputForm'>

                <form action="" id="mlform" className='flex relative flex-col md:flex-row'>
                  <select name="ml" id="mlselect" className='select' onChange={setValue}>
                    {data.map((res) =>
                      <option id="incase" value={[res.Capacity, res.BPrice, res.InCase, res.Article]}>{res.Capacity}</option>
                    )}
                  </select>

                  
                  {/* <datalist id='case'>
                    {number.map(res =>
                      <option value={res} id='number'>{res}</option>
                    )}
                  </datalist>
                  <input type="text" list="case" id="avdar" className='select' onChange={setValue} placeholder="?????????????? ??????" defaultValue={1}/> */}
                  <select type="text" name="" id="avdar" className='select' >
                  {number.map(res =>
                      <option value={res} id='number'>{res}</option>
                    )}
                  </select>


                  <div className='selectTotal flex justify-center items-center text-center'>
                    <p className='total text-red-700 pt-4 9xl:text-3xl' id='result'>
                      {ftotal}???
                    </p>
                  </div>
                  <div className='tablenames absolute flex flex-col md:flex-row text-sm 9xl:text-3xl mt-1'>
                    <div className='tablename1'>
                      <p className=''>????????????</p>
                    </div>
                    <div className='tablename2'>
                      <p className=''>??????????</p>
                    </div>
                    <div className='tablename3'>
                      <p className=''>???????? ??????</p>
                    </div>
                  </div>

                  <Link className="nav-link" to="#" id='submit' onClick={Busket}>
                    <ToastContainer />
                    <button className="sagslahButton text-xl 9xl:text-5xl" id='fly'>
                      ??????????????
                    </button>
                  </Link>

                </form>
              </div>
            </div>
             {array == '' ? '' : <a href="/order"> <h4 className='flex justify-center text-gray-400 xl:hidden mt-3 hover:text-black'> <img src={sagsicon} alt="" className='w-[5%]'/>  --> </h4> </a>}
            <div className='phoneBusket mb-3 p-2 flex flex-wrap flex-col sm:flex-row justify-center xl:hidden'>
        
            {array.map(data =>
            <div className='flex w-1/2'>
                  <div className="zahialsanHesegContent mt-3">

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
                          <p className="text-sm 9xl:text-3xl 9xl:mt-3">?????????????????? ??????: {data.tincase} ????????????</p>
                        </div>

                        <div className="order1Price flex justify-between items-center">
                          <h3 className="9xl:text-5xl">{data.price}??? </h3>
                          <div className="order1Button flex justify-between">
                            <button className="" onClick={() => {
                              if (data.avdar > 1 && sum > 0) {
                                data.avdar -= 1;
                                data.tincase -= parseInt(data.incase);
                                data.price -= parseInt(data.incase) * parseInt(data.sprice);
                                sum -= parseInt(data.incase) * parseInt(data.sprice);
                              }
                              sessionStorage.setItem("array", JSON.stringify(array));
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
                              sessionStorage.setItem("array", JSON.stringify(array));
                              var sum = 0;
                              array.forEach(x => {
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
                  </div>
                )}
                
                </div>
            

            <div className='productInfo'>
              <img src={productInfo} alt="" className='productImg' />
            </div>
            <Router>
              <div className='ChangeInfo '>
                <div className='link flex justify-between py-3'>
                  <NavLink className="nav-link" exact to='/' activeClassName='is-active'>
                    ???????????????????????????? ??????????????
                  </NavLink>
                  <NavLink className="nav-link" to='/instruction' activeClassName='is-active'>
                    ???????????????? ????????????
                  </NavLink>
                  <NavLink className="nav-link" to='/nutrition' activeClassName='is-active'>
                    ?????????????????? ??????????
                  </NavLink>
                </div>
                <div className=''>
                  <Switch>
                    <Route exact path='/' component={Product} />
                    <Route path='/instruction' component={Instruction} />
                    <Route path='/nutrition' component={Nutrition} />
                  </Switch>
                </div>
              </div>
            </Router>
          </div>

        </div>
        <Social />
      </div>
    </div>
  )
}
