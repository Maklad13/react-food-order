import useHttp from "./hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./UI/Error";

export default function Meals() {
  const {
    data: loadedMeals,
    error,
    isLoading,
  } = useHttp("http://localhost:3000/meals", null, []);
  if (error) {
    return <Error title="failed to load meals" message={error} />;
  }
  if (isLoading) {
    return <p className="center">Loading Meals...</p>;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
