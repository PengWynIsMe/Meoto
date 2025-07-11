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
