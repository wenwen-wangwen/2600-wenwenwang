import React from 'react';
const { useState, useEffect } = React;
import axios from 'axios';

const FoodSection = props => {
  const [chosenCuisine, setChosenCuisine] = useState('');
  const [chosenCuisine2, setChosenCuisine2] = useState('');
  const [newFoodName, setNewFoodName] = useState('');
  const [description, setDescription] = useState('');

  const updateChosenCuisine = event => {
    setChosenCuisine(event.target.value);
    console.log(event.target.value);
    console.log(chosenCuisine);
  }

  const updateChosenCuisine2 = event => {
    setChosenCuisine2(event.target.value);
    console.log(event.target.value);
    console.log(chosenCuisine2);
  }

  const updateFoodName = event => {
    setNewFoodName(event.target.value);
    console.log(event.target.value);
  }

  const updateDescription = event => {
    setDescription(event.target.value);
  }

  const addFood = event => {
    event.preventDefault();
    // console.log(event.target.cuisine.value);
    axios.post('/api/v1/foods', {
      'cuisine': chosenCuisine,
      'name': newFoodName,
      'description': description
    })
    .then(result => console.log(result))
    .catch(error=>console.log(error))
  }

  const getFoodsOfCuisine = event => {
    event.preventDefault();
    axios.get(`/api/v1/cuisines/${chosenCuisine2}`)
    .then(result => console.log(result.data))
    .catch(error=>console.log(error))
  }
  

  return (
    <>
      <h2>Food</h2>
      <div id='new-food'>
        <h3>Add a food</h3>
        <form onSubmit={event=>addFood(event)}>
          <label htmlFor='cuisine-select'>Choose a cuisine: 
          </label>
          <select name='cuisine' onChange={updateChosenCuisine} defaultValue='default'>
            <option disabled value='default'>-- choose a cuisine --</option>
            {props.allCuisines.map(cuisine=><option value={cuisine.name}>{cuisine.name}</option>)}
          </select>
          <label>Food name:  
            <input type="text" onChange={event=>updateFoodName(event)} value={newFoodName}/>
          </label>
          <label>
            Description: 
            <textarea onChange={updateDescription}></textarea></label>
          <button>submit food</button>
        </form>
      </div>
      <div>
        {/* the following does not work FIXME: */}
        <h3>All Foods</h3>
          <form onSubmit={getFoodsOfCuisine}>
            <label htmlFor='cuisine-select'>Choose a cuisine: 
            </label>
            <select name='cuisine2' onChange={updateChosenCuisine2} defaultValue='default'>
              <option disabled value='default'>-- choose a cuisine --</option>
              {props.allCuisines.map(cuisine=><option value={cuisine.name}>{cuisine.name}</option>)}
            </select>
            <button>Find</button>
          </form>

          
            <ul id='all-foods'>
              {props.allCuisines.map(cuisine=><li>{cuisine.name}</li>)}
            </ul>
      </div>
    </>
  )
}

export default FoodSection;