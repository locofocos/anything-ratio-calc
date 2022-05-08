'use strict'

const App = () => {
  return <div>
    <h1>Anything ratio calculator</h1>
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

  React.useEffect(() => {
    // Load from query params on page load
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.ingredientLabels && params.recipeRatios) {
      let parsedIngredientLabels = params.ingredientLabels.split("|")
      let parsedRecipeRatios = params.recipeRatios.split("|")

      if (parsedIngredientLabels.length === parsedRecipeRatios.length) {
        setIngredientLabels(parsedIngredientLabels)
        setRecipeRatios(parsedRecipeRatios)
        setCalculatedValues(parsedRecipeRatios)
        console.log(parsedRecipeRatios)
      }
    }
  }, [])

  React.useEffect(() => {
    // Update the query params so users can share the URL, bookmark it, etc.
    if ('URLSearchParams' in window) {
      let searchParams = new URLSearchParams(window.location.search)
      searchParams.set("ingredientLabels", ingredientLabels.join("|"));
      searchParams.set("recipeRatios", recipeRatios.join("|"));

      let newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      history.pushState(null, '', newRelativePathQuery);
    }

  }, [recipeRatios, ingredientLabels])

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
          <button onClick={() => {
            // Remove ith element from everything

            const arrayRemoveItem = (array, i) => {
              const x = [...array]
              x.splice(i, 1)
              return x
            }

            setRecipeRatios((recipeRatios) => arrayRemoveItem(recipeRatios, i))
            setCalculatedValues((calculatedValues) => arrayRemoveItem(calculatedValues, i))
            setIngredientLabels((ingredientLabels) => arrayRemoveItem(ingredientLabels, i))
          }}>x
          </button>
        </div>)
    })}

    <button onClick={() => {
      setRecipeRatios((recipeRatios) => [...recipeRatios, 1])
      setCalculatedValues((calculatedValues) => [...calculatedValues, null]) // onRecipeChange will fill this in
      setIngredientLabels((ingredientLabels) => [...ingredientLabels, 'Ingredient'])

      onRecipeChange()
    }}>Add ingredient
    </button>

    <h2>Calculated values</h2>

    {ingredientLabels.map((ingredientLabel, i) => {
      return (
        <div className="medium-margin" key={`calculated-ingredient-${i}`}>
          <span style={{ marginRight: 8 }}>{ingredientLabel}</span>
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