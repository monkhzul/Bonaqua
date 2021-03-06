import React from 'react';
import bonaqua from '../../images/546A4010.png';
import bigflower from '../../images/svg/home/tsetseg tom.svg';
import lineflower from '../../images/svg/order 2/Group 550.svg';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";
import AllOrder from '../orderHistory/AllOrder';
import OrderConfirm from '../orderHistory/orderConfirm';
import OrderDelivered from '../orderHistory/OrderDelivered';
import Social from '../Social';
import { AppContext } from "../../App";
import { useEffect, useContext } from 'react';

export default function OrderHistory() {
  const { orderHistory, value } = useContext(AppContext);

  const dugaarc = sessionStorage.getItem("dugaar");

  // useEffect(() => {
  //   var getData = async () => {
  //     try {
  //       var data = await fetch('http://localhost:8090/api/bonaqua/orderHistory');
  //       var resData = await data.json();
  //       setHistory(resData)
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getData();
  // }, [])

  // var tuuh = [];
  // var dugaar = []

  // orderHistory.forEach(x => { 
  //   tuuh.push(x.orderno)
  //   dugaar.push(x.phonenumber)
  // })

  return (
    <div className='mx-auto flex flex-col justify-between'>
      <div className='flex flex-col xl:flex-row'>
        <div className='choosing w-full xl:w-1/2 flex items-center justify-center relative mt-14'>
          <div className='bona flex justify-center items-start relative'>
            <div className='flower absolute'>
              <img src={bigflower} alt="" className='bigflower' />
            </div>
            <img src={bonaqua} alt="" className='' />
            <div className='toirog absolute'>
              <div className='white flex justify-center items-center'>
                <div className='circle relative flex justify-center items-center'>
                  <p className='text-white font-semibold text-sm 9xl:text-4xl' id='capaInCircle'>bonaqua</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='info w-full xl:w-1/2 mr-14 mt-3'>
          <h1 className=''>?????????????????? ????????</h1>
          <Router>
            <div className='orderHistoryLink'>
              <div className='link flex py-3 w-full'>
                {/* <div className='flex'>
                  <div>
                    <NavLink className={isActive => isActive ? "is-active" : "nav-link"} to="/orderHistory">
                      ????????
                    </NavLink>
                  </div>
                  <div className='mx-3'>
                    <NavLink className={isActive => isActive ? "is-active" : "nav-link"} to="/orderHistory/orderConfirm">
                      ????????????????????????
                    </NavLink>
                  </div>
                  <div>
                    <NavLink className={isActive => isActive ? "is-active" : "nav-link"} to="/orderHistory/orderDelivered">
                      ????????????????????
                    </NavLink>
                  </div>
                </div> */}

                <div className='link flex justify-between py-3 mr-[20%]'>
                  <NavLink className="nav-link" exact to='/orderHistory' activeClassName='is-active'>
                    ????????
                  </NavLink>
                  <NavLink className="nav-link" to='/orderHistory/orderConfirm' activeClassName='is-active'>
                    ????????????????????????
                  </NavLink>
                  <NavLink className="nav-link" to='/orderHistory/orderDelivered' activeClassName='is-active'>
                    ????????????????????
                  </NavLink>
                </div>

                <div className="sort flex justify-end">
                  <select name="" id="" className='select w-full'>
                    <option value="" className=''>???????????????? ???? ??????????????</option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
              <div className=''>
                <Switch>
                  <Route exact path="/orderHistory" component={AllOrder} />
                  <Route path="/orderHistory/orderConfirm" component={OrderConfirm} />
                  <Route path="/orderHistory/orderDelivered" component={OrderDelivered} />
                </Switch>
              </div>
            </div>
          </Router>

          <div className='my-14'>
            <img src={lineflower} alt="" className='w-full' />
          </div>

          <div>
            <Link className="nav-link" to="/payment">
              <button className='backPaymentButton'>
                ???????????? ?????????? ?????????? ?????? ??????????
              </button>
            </Link>
          </div>
          <div>
            <Link className="nav-link" to="/">
              <button className='backPaymentButton' onClick={() => {sessionStorage.clear(); window.location.pathname = '/'}}>
                ??????????
              </button>
            </Link>
          </div>

        </div>

        <Social />
      </div>
    </div>
  )
}

