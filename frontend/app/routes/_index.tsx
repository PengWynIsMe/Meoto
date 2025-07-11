import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import "~/styles/slider.css";

import { getHeader } from "~/services/header";
import { getCars, getCities, getBrands } from "~/services/car";

import Header from "~/components/layout/Header";
import Slider from "~/components/layout/Slider";
import CarFilterForm from "~/components/car/CarFilterForm";
import CarCard, { CarCardProps } from "~/components/car/CarCard";

export const meta: MetaFunction = () => {
  return [
    { title: "Sàn giao dịch ôtô số 1 Việt Nam" },
    {
      name: "description",
      content: "Mua bán ôtô dễ dàng với đầy đủ thương hiệu và kiểu dáng.",
    },
  ];
};

const BASE_URL = "http://127.0.0.1:1337";

export const loader: LoaderFunction = async () => {
  const [menuItemsRes, homePageRes, cars, cities, brands] = await Promise.all([
    getHeader(),
    fetch(`${BASE_URL}/api/home-page?populate[Slider][populate]=image`),
    getCars(),
    getCities(),
    getBrands(),
  ]);

  const homeData = await homePageRes.json();
  const slides = homeData.data?.Slider || [];

  const formattedCars: CarCardProps[] = cars.map((car: any) => ({
    id: car.id.toString(),
    image: car.image ? `${BASE_URL}${car.image}` : "/placeholder.jpg",
    featured: true,
    imageCount: 1,
    year: car.year,
    category: car.body_style,
    title: `${car.name} - ${car.model}`,
    mileage: car.mileage,
    fuelType: car.origin,
    transmission: car.transmission,
    price: car.price,
    sellerName: car.brand?.name ?? "Unknown",
    sellerAvatar: "/default-avatar.png",
  }));

  return json({
    menuItems: menuItemsRes,
    slides,
    cars: formattedCars,
    cities,
    brands,
  });
};

export default function IndexPage() {
  const { menuItems, slides, cars, cities, brands } =
    useLoaderData<typeof loader>();

  return (
    <>
      <Header headerData={menuItems} />
      <Slider slides={slides} />

      <section className="bg-white py-8 px-6">
        <CarFilterForm cities={cities} brands={brands} />
      </section>

      <section className="bg-gray-50 py-8 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Xe Mới Đăng Bán</h2>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl">
          {cars.map((car: CarCardProps) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      </section>
    </>
  );
}
