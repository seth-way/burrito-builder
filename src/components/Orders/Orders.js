import React from 'react';
import './Orders.css';

const Orders = ({ orders }) => {
  console.log('props.orders', orders);
  const orderEls = orders ? orders.map((order, orderIdx) => {
    return (
      <div className='order' key={`order_${orderIdx}`}>
        <h3>{order.name}</h3>
        <ul className='ingredient-list'>
          {order.ingredients.map((ingredient, ingIdx) => {
            return (
              <li key={`in_${orderIdx}_${ingIdx}_${ingredient}`}>
                {ingredient}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }) : [];

  return (
    <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;
