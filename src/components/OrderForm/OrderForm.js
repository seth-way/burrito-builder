import { useState } from 'react';
import { postOrder } from '../../apiCalls';

function OrderForm({ addOrder }) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);

  function handleAddIngredient(e) {
    e.preventDefault();
    const ingredient = e.currentTarget.name;
    if (ingredients.includes(ingredient)) {
      const updated = ingredients.filter(
        anyIngredient => anyIngredient !== ingredient
      );
      setIngredients(updated);
    } else {
      setIngredients(prev => [...prev, ingredient]);
    }
  }

  function handleChange(e) {
    setName(() => e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name && ingredients.length) {
      postOrder({ name, ingredients })
        .then(res => {
          if (res.id) {
            addOrder(res);
            clearInputs();
          }
        })
        .catch(err => console.log('error caught'));
    }
  }

  function clearInputs() {
    setName('');
    setIngredients([]);
  }

  const possibleIngredients = [
    'beans',
    'steak',
    'carnitas',
    'sofritas',
    'lettuce',
    'queso fresco',
    'pico de gallo',
    'hot sauce',
    'guacamole',
    'jalapenos',
    'cilantro',
    'sour cream',
  ];
  const ingredientButtons = possibleIngredients.map(ingredient => {
    return (
      <button key={ingredient} name={ingredient} onClick={handleAddIngredient}>
        {ingredient}
      </button>
    );
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={handleChange}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(', ') || 'Nothing selected'}</p>

      <button>Submit Order</button>
    </form>
  );
}

export default OrderForm;
