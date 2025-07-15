// services/car.ts
export const getCities = async () => {
  const res = await fetch("http://127.0.0.1:1337/api/cities");
  const data = await res.json();
  return data.data;
};

export const getBrands = async () => {
  const res = await fetch("http://127.0.0.1:1337/api/brands");
  const data = await res.json();
  return data.data;
};

export const getCars = async () => {
  const res = await fetch("http://127.0.0.1:1337/api/cars?populate=*");
  const json = await res.json();

  return json.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    model: item.model,
    year: item.year,
    mileage: item.mileage,
    body_style: item.body_style,
    origin: item.origin,
    transmission: item.transmission,
    price: item.price,
    image: item.image?.url,
    brand: item.brand || null,
    city: item.city || null,
    isNew: item.isNew,
    description: item.description,
  }));
};
export const fetchFilteredCars = async (filters: any) => {
  const query = new URLSearchParams();

  if (filters.keyword)
    query.append("filters[name][$containsi]", filters.keyword);
  if (filters.brand) query.append("filters[brand][name][$eq]", filters.brand);
  if (filters.location)
    query.append("filters[city][name][$eq]", filters.location);
  if (filters.priceRange) {
    query.append("filters[price][$gte]", filters.priceRange[0]);
    query.append("filters[price][$lte]", filters.priceRange[1]);
  }
  if (filters.kmRange) {
    query.append("filters[mileage][$lte]", filters.kmRange[1]);
  }
  if (filters.showNewOnly) query.append("filters[isNew][$eq]", "true");

  query.append("populate[image][fields][0]", "url");

  const res = await fetch(`http://127.0.0.1:1337/api/cars?${query.toString()}`);
  const json = await res.json();

  if (!json.data) return [];

  return json.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    model: item.model,
    year: item.year,
    mileage: item.mileage,
    body_style: item.body_style,
    origin: item.origin,
    transmission: item.transmission,
    price: item.price,
    isNew: item.isNew,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : null,
  }));
};
