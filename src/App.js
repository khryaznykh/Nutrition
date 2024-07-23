import { useEffect, useState } from 'react';
import image from './Edamam_Badge_Transparent.svg'
import './App.css';
import LoaderPage from './Loader/LoaderPage';
import NutritionTable from './NutritionTable';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [myInput, setMyInput] = useState ();
  const [myWordToSearch, setMyWordToSearch] = useState("");
  const [loaderState, setLoaderState] = useState(false);
  const [nutrition, setNutrition] = useState ();


  const fetchRequest = async (ingridient)=>{
    setLoaderState(true);

      const response = await fetch ('https://api.edamam.com/api/nutrition-details?app_id=c2256341&app_key=%2040589299aa87b22b3f7f3195507b62b6', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' //tells the type of information that is sent
        },
        body: JSON.stringify({ingr:ingridient}) //is the actual adata that we're sending
      });

      if (response.ok) {
        setLoaderState(false)
        const data = await response.json();
        setNutrition(data)
        console.log(data)
      }
      else {
        setLoaderState(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ingredients entered incorrectly!",
          footer: 'The correct format should be "1 cup rice, 10 oz chickpeas", etc.'
        });
        
      }
    
  }

  useEffect(()=>{
    if (myWordToSearch !== "") {
      let ingridient = myWordToSearch.split(/[,,;,\n,\r]/);
      fetchRequest(ingridient);
      // fetchData(ingridient)
    }
  },[myWordToSearch])

  const recipeSearch = (e) => {
    setMyInput(e.target.value);
    console.log (myInput)
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setMyWordToSearch(myInput)
  }
  return (
    <div className="App">
      <div className='container'>
        {loaderState && <LoaderPage/>}
      <div className='header'>
        <h1>Nutrition Analysis</h1>
        <div id="edamam-badge" data-color="none"><img src={image} alt="edamam"/></div>
      </div>
      
      <form className='nutrition' onSubmit={finalSearch}>
        <input className="input" type='text' placeholder='Enter your ingredients...' onChange={recipeSearch}/>
        <button className="btn" onClick={finalSearch}>Search</button>
      </form>
      <div className='text-under nutrition'>
        <p>Enter an ingredient list for what you are cooking, like "1 cup rice, 10 oz chickpeas", etc.</p>
      </div>

      {nutrition && <p className='nutrition text'>The nutrition value of {myWordToSearch} is {nutrition.calories} kcal</p>}

      {nutrition && Object.values(nutrition.totalNutrients)
        .map(({label, quantity, unit})=>{
          return(
            <table key={uuidv4()}  className="nutrition">
          <NutritionTable
          label = {label}
          quantity = {quantity}
          unit = {unit}/>
          </table>
        )})
      }
      </div>

    </div>
  );
}

export default App;
