export function searchCars(cars, query) {
  if (!Array.isArray(cars)) return [];
  const q = String(query ?? '').trim().toLowerCase();
  if (!q) return cars;
  return cars.filter((car) => {
    const hay = `${car.name ?? ''} ${car.brand ?? ''} ${car.model ?? ''}`.toLowerCase();
    return hay.includes(q);
  });
}

