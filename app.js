'use strict'

const App = () => {
  return <div>
    <Calculator/>
  </div>
}

const Calculator = () => {

  const [recipeCoffeeG, setRecipeCoffeeG] = React.useState(8)
  const [recipeWaterOz, setRecipeWaterOz] = React.useState(6)

  const [calculatedCoffeeG, setCalculatedCoffeeG] = React.useState(recipeCoffeeG)
  const [calculatedWaterOz, setCalculatedWaterOz] = React.useState(recipeWaterOz)


  return <div>
    <h2>Recipe values</h2>
    <div>
      <span>Coffee (g)</span>
      <input value={recipeCoffeeG} onChange={(e) => setRecipeCoffeeG(e.target.value)}/>
    </div>
    <div>
      <span>Water (oz)</span>
      <input value={recipeWaterOz} onChange={(e) => setRecipeWaterOz(e.target.value)}/>
    </div>

    <h2>Calculated values</h2>
    <div>
      <span>Coffee (g)</span>
      <input value={calculatedCoffeeG} onChange={(e) => {
        setCalculatedCoffeeG(e.target.value)
        setCalculatedWaterOz(parseFloat(e.target.value) * parseFloat(recipeWaterOz) / parseFloat(recipeCoffeeG))
      }}/>
    </div>
    <div>
      <span>Water (oz)</span>
      <input value={calculatedWaterOz} onChange={(e) => {
        setCalculatedWaterOz(e.target.value)
        setCalculatedCoffeeG(parseFloat(e.target.value) * parseFloat(recipeCoffeeG) / parseFloat(recipeWaterOz))
      }}/>
    </div>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App/>)