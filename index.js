const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      title: "Sopa de ajo",
      cuisine: "Spain"
    })    
  })
  
  .then(()=>{
    
    return Recipe.insertMany(data);       
  })
  .then((allRecipes)=>{
    let allRecipesTitle = allRecipes.map((recepieTitle) => {

      return recepieTitle.title
    })
    console.log(allRecipesTitle);
  })
  .then(() =>{
    return Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {duration: 100},
      { new: true }
    )
  })
  .then(()=>{
    return Recipe.findOneAndDelete({title: "Carrot Cake"})
  })
  .then(()=>{
    return console.log('Carrot Cake eliminado')
  })

  .then(()=>{
    mongoose.connection.close()
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
