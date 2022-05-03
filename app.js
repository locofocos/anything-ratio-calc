'use strict'

const App = () => {
  return <div>
    <h1>Coffee ratio calculator</h1>
    <Calculator/>
  </div>
}

const Calculator = () => {

  const [recipeCoffeeG, setRecipeCoffeeG] = React.useState(8)
  const [recipeWaterOz, setRecipeWaterOz] = React.useState(6)
  const [recipeServings, setRecipeServings] = React.useState(1)

  const [calculatedCoffeeG, setCalculatedCoffeeG] = React.useState(recipeCoffeeG)
  const [calculatedWaterOz, setCalculatedWaterOz] = React.useState(recipeWaterOz)
  const [calculatedServings, setCalculatedServings] = React.useState(recipeServings)


  const onRecipeChange = () => {
    // Assume that calculatedServings is what the user would want to base things off the most
    setCalculatedCoffeeG(parseFloat(calculatedServings) * parseFloat(recipeCoffeeG) / parseFloat(recipeServings))
    setCalculatedWaterOz(parseFloat(calculatedServings) * parseFloat(recipeWaterOz) / parseFloat(recipeServings))
  }

  React.useEffect(onRecipeChange, [recipeCoffeeG, recipeWaterOz, recipeServings])

  return <div>
    <h2>Recipe</h2>
    <div className="medium-margin">
      <span>Grounds (g)</span>
      <input type="number" value={recipeCoffeeG} onChange={(e) => setRecipeCoffeeG(e.target.value)}/>
    </div>
    <div className="medium-margin">
      <span>Water (oz)</span>
      <input type="number" value={recipeWaterOz} onChange={(e) => setRecipeWaterOz(e.target.value, onRecipeChange)}/>
    </div>
    <div className="medium-margin">
      <span>Servings</span>
      <input type="number" value={recipeServings} onChange={(e) => setRecipeServings(e.target.value, onRecipeChange)}/>
    </div>

    <h2>Calculator</h2>
    <div className="medium-margin">
      <span>Grounds (g)</span>
      <input type="number" value={calculatedCoffeeG} onChange={(e) => {
        setCalculatedCoffeeG(e.target.value)
        setCalculatedWaterOz(parseFloat(e.target.value) * parseFloat(recipeWaterOz) / parseFloat(recipeCoffeeG))
        setCalculatedServings(parseFloat(e.target.value) * parseFloat(recipeServings) / parseFloat(recipeCoffeeG))
      }}/>
    </div>
    <div className="medium-margin">
      <span>Water (oz)</span>
      <input type="number" value={calculatedWaterOz} onChange={(e) => {
        setCalculatedWaterOz(e.target.value)
        setCalculatedCoffeeG(parseFloat(e.target.value) * parseFloat(recipeCoffeeG) / parseFloat(recipeWaterOz))
        setCalculatedServings(parseFloat(e.target.value) * parseFloat(recipeServings) / parseFloat(recipeWaterOz))
      }}/>
    </div>
    <div className="medium-margin">
      <span>Servings</span>
      <input type="number" value={calculatedServings} onChange={(e) => {
        setCalculatedServings(e.target.value)
        setCalculatedCoffeeG(parseFloat(e.target.value) * parseFloat(recipeCoffeeG) / parseFloat(recipeServings))
        setCalculatedWaterOz(parseFloat(e.target.value) * parseFloat(recipeWaterOz) / parseFloat(recipeServings))
      }}/>
    </div>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App/>)