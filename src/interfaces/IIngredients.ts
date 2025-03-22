export interface IngredientResponse{
    drinks: DrinkForIngredients[]
}
export interface DrinkForIngredients {
    strDrink: string
    strDrinkThumb: string
    idDrink: string
  }