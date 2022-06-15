import React from 'react';
import bonaqua from '../../images/bona0.5.png';
import bigflower from '../../images/svg/home/tsetseg tom.svg';
import lineflower from '../../images/svg/order 2/Group 550.svg';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import AllOrder from '../orderHistory/AllOrder';
import OrderConfirm from '../orderHistory/orderConfirm';
import OrderDelivered from '../orderHistory/OrderDelivered';
import Social from '../Social';

export default function OrderHistory() {
  return (
    <div className='mx-auto flex flex-col justify-between'>
      <div className='flex flex-col lg:flex-row'>
        <div className='choosing w-full lg:w-1/2 flex items-center justify-center relative mt-14'>
          <div className='bona flex justify-center items-start relative'>
            <div className='flower absolute'>
              <img src={bigflower} alt="" className='bigflower' />
            </div>
            <img src={bonaqua} alt="" className='' />
            <div className='toirog absolute'>
              <div className='white flex justify-center items-center'>
                <div className='circle relative flex justify-center items-center'>
                  <p className='text-white font-semibold 9xl:text-4xl' id='capaInCircle'>500 мл</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='info w-full lg:w-1/2 mr-14 mt-3'>
          <h1 className=''>Захиалгын түүх</h1>
          <Router>
            <div className='orderHistoryLink'>
              <div className='link flex justify-around py-3 w-full'>
                <div className='flex'>
                  <div>
                    <NavLink className={isActive => isActive ? "is-active" : "nav-link"} to="/orderHistory">
                      Бүгд
                    </NavLink>
                  </div>
                  <div className='mx-3'>
                    <NavLink className={isActive => isActive ? "is-active" : "nav-link"} to="/orderHistory/orderConfirm">
                      Баталгаажсан
                    </NavLink>
                  </div>
                  <div>
                    <NavLink className={isActive => isActive ? "is-active" : "nav-link"} to="/orderHistory/orderDelivered">
                      Хүргэгдсэн
                    </NavLink>
                  </div>
                </div>
                <div className="sort flex justify-end">
                  <select name="" id="" className='select w-full'>
                    <option value="" className=''>Сүүлийнх нь эхэндээ</option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
              <div className=''>
                <Switch>
                  <Route exact path="/orderHistory" children={<AllOrder />} />
                  <Route path="/orderHistory/orderConfirm" children={<OrderConfirm />} />
                  <Route path="/orderHistory/orderDelivered" children={<OrderDelivered />} />
                </Switch>
              </div>
            </div>
          </Router>

          <div className='my-14'>
            <img src={lineflower} alt="" className='w-full' />
          </div>
        </div>

        <Social />
      </div>
    </div>
  )
}

