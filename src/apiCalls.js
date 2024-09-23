export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => {
      if (!response.ok) throw new Error('error fetching orders.');
      return response.json();
    })
    .then(data => data)
    .catch(err => {
      console.error(err);
      return err;
    });
};

export const postOrder = order => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('error posting new order:', order.name);
    })
    .then(data => data)
    .catch(err => {
      console.error(err);
      err.status = 500;
      return err;
    });
};
