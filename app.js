'use strict'

const App = () => {
  return <div>
    <h1>Coffee ratio calculator</h1>
    <Calculator/>
  </div>
}

const Calculator = () => {

  const [recipeRatios, setRecipeRatios] = React.useState([1, 8, 6, 13])
  const [ingredientLabels, setIngredientLabels] = React.useState([
    'Servings',
    'Grounds (g)',
    'Water (oz)',
    'Honey (g)'
  ])
  const [calculatedValues, setCalculatedValues] = React.useState(recipeRatios)

  const allRecipeValuesSet = !recipeRatios.some(e => !e)

  const onRecipeChange = () => {
    // Assume that the first input, probably "Servings = 1" (or similar)
    // is what the user would want to base other calculated values off of the most.
    if (!allRecipeValuesSet) {
      return
    }

    setCalculatedValues(() => {
      return recipeRatios.map((recipeRatio) => {
        return parseFloat(calculatedValues[0]) * parseFloat(recipeRatio) / parseFloat(recipeRatios[0])
      })
    })
  }

  React.useEffect(onRecipeChange, [recipeRatios])

  return <div>
    <h2>Recipe</h2>
    {ingredientLabels.map((ingredientLabel, i) => {
      return (
        <div className="medium-margin" key={`recipe-ingredient-${i}`}>
          <input type="text" value={ingredientLabel} onChange={(e) => {
            setIngredientLabels((ingredientLabels) => {
              let newIngredientLabels = [...ingredientLabels]
              newIngredientLabels[i] = e.target.value
              return newIngredientLabels
            })
          }}/>
          <input type="number" value={recipeRatios[i]} onChange={(e) => {
            setRecipeRatios(recipeRatios => {
              let newRecipeRatios = [...recipeRatios]
              newRecipeRatios[i] = e.target.value // not parsing at this point b/c that makes it hard to type decimals. So this stores strings.
              return newRecipeRatios
            })
          }}/>
        </div>)
    })}

    <h2>Calculator</h2>

    {ingredientLabels.map((ingredientLabel, i) => {
      return (
        <div className="medium-margin" key={`calculated-ingredient-${i}`}>
          <span>{ingredientLabel}</span>
          <input type="number" value={calculatedValues[i]} onChange={(e) => {
            setCalculatedValues((calculatedValues) => {
              let newCalculatedValues

              if (e.target.value === '') {
                // avoid a parse exception + clearing out all calculated fields when deleting a single calculated field
                newCalculatedValues = [...calculatedValues]
              } else {
                let inputValue = parseFloat(e.target.value)

                newCalculatedValues = recipeRatios.map((recipeRatio) => {
                  // for example, if you changed calculatedGrounds:
                  // calculatedWater = calculatedGrounds * recipeWater / recipeGrounds
                  return inputValue * parseFloat(recipeRatio) / parseFloat(recipeRatios[i])
                })
              }

              newCalculatedValues[i] = e.target.value
              return newCalculatedValues
            })
          }}/>
        </div>
      )
    })}
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App/>)