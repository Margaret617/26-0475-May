export function filterCars(cars, filters = {}) {
  if (!Array.isArray(cars)) return [];
  return cars.filter((car) => {
    if (filters.search) {
      const s = String(filters.search).toLowerCase();
      const hay = `${car.name ?? ''} ${car.brand ?? ''}`.toLowerCase();
      if (!hay.includes(s)) return false;
    }
    return true;
  });
}

