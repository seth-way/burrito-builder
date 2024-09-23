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
