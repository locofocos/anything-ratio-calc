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
  const [recipeHoney, setRecipeHoney] = React.useState(13) // don't judge me
  const [recipeServings, setRecipeServings] = React.useState(1)

  const [calculatedCoffeeG, setCalculatedCoffeeG] = React.useState(recipeCoffeeG)
  const [calculatedWaterOz, setCalculatedWaterOz] = React.useState(recipeWaterOz)
  const [calculatedHoney, setCalculatedHoney] = React.useState(recipeHoney)
  const [calculatedServings, setCalculatedServings] = React.useState(recipeServings)


  const onRecipeChange = () => {
    // Assume that calculatedServings is what the user would want to base things off the most
    setCalculatedCoffeeG(parseFloat(calculatedServings) * parseFloat(recipeCoffeeG) / parseFloat(recipeServings))
    setCalculatedWaterOz(parseFloat(calculatedServings) * parseFloat(recipeWaterOz) / parseFloat(recipeServings))
    setCalculatedHoney(parseFloat(calculatedServings) * parseFloat(recipeHoney) / parseFloat(recipeServings))
  }

  React.useEffect(onRecipeChange, [recipeCoffeeG, recipeWaterOz, recipeHoney, recipeServings])

  return <div>
    <h2>Recipe</h2>
    <div className="medium-margin">
      <span>Grounds (g)</span>
      <input type="number" value={recipeCoffeeG} onChange={(e) => setRecipeCoffeeG(e.target.value)}/>
    </div>
    <div className="medium-margin">
      <span>Water (oz)</span>
      <input type="number" value={recipeWaterOz} onChange={(e) => setRecipeWaterOz(e.target.value)}/>
    </div>
    <div className="medium-margin">
      <span>Honey (g)</span>
      <input type="number" value={recipeHoney} onChange={(e) => setRecipeHoney(e.target.value)}/>
    </div>
    <div className="medium-margin">
      <span>Servings</span>
      <input type="number" value={recipeServings} onChange={(e) => setRecipeServings(e.target.value)}/>
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
        setCalculatedHoney(parseFloat(e.target.value) * parseFloat(recipeHoney) / parseFloat(recipeWaterOz))
      }}/>
    </div>
    <div className="medium-margin">
      <span>Honey (g)</span>
      <input type="number" value={calculatedHoney} onChange={(e) => {
        setCalculatedHoney(e.target.value)
        setCalculatedCoffeeG(parseFloat(e.target.value) * parseFloat(recipeCoffeeG) / parseFloat(recipeHoney))
        setCalculatedServings(parseFloat(e.target.value) * parseFloat(recipeServings) / parseFloat(recipeHoney))
        setCalculatedWaterOz(parseFloat(e.target.value) * parseFloat(recipeWaterOz) * parseFloat(recipeHoney))
      }}/>
    </div>
    <div className="medium-margin">
      <span>Servings</span>
      <input type="number" value={calculatedServings} onChange={(e) => {
        setCalculatedServings(e.target.value)
        setCalculatedCoffeeG(parseFloat(e.target.value) * parseFloat(recipeCoffeeG) / parseFloat(recipeServings))
        setCalculatedWaterOz(parseFloat(e.target.value) * parseFloat(recipeWaterOz) / parseFloat(recipeServings))
        setCalculatedHoney(parseFloat(e.target.value) * parseFloat(recipeHoney) / parseFloat(recipeServings))
      }}/>
    </div>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App/>)