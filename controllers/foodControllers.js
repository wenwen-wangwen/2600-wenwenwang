const { Food } = require('./../models/Food');
const Cuisine = require('./../models/Cuisine');
//TODO: used const Food, instead of { Food } -> Food is not a constructor error (coz 2 objects exported and I refer to both if not using {}!)

const getFoods = (req, res) => {
  Food.find({})
  .exec()
  .then(results=>res.status(200).json(results))
  .catch(error=>console.log(error))
}

// const getFood = (req, res) => {
//   Food.find({name: req.params.id})
//   .exec()
//   .then(result => res.status(200).json(result))
//   .catch(error=>console.log(error))
  
// }

const postFood = (req, res) => {
  if (res.locals.errors != null) {
    res.status(400).json(res.locals.errors[0].message);
  } 

  else {

  const { cuisine, name, description } = req.body;
  console.log(`3 values are: ${cuisine}, ${name}, ${description}`);
  Cuisine.findOne({name: cuisine})
  .exec()
  .then(result => {
    console.log(`the value is ${cuisine}`);
    let foundCuisine = result;

    let match = foundCuisine.foods.find(food=>food.name === name);
    console.log(`search for food with same name: ${match}`);

    if (match) { //why does match.length > 0 not work
      console.log(`found a match`);
      res.status(400).json('Food already exists.')
    }
    else {
      console.log(`not found a match`);

      let newFood = new Food({
        name: name,
        description: description
      });
      foundCuisine.foods.push(newFood);
      foundCuisine.save()
      .then(result=>res.status(200).json(result))
      .catch(error=>console.log(error))
    }

  })
  .catch(error=>console.log(error))

  }



  
}


module.exports = {
  postFood,
  getFoods,
  // getFood
}