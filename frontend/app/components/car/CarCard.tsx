import React from "react";
import { Camera, Gauge, Zap, Settings } from "lucide-react";

export interface CarCardProps {
  id: string;
  image: string;
  featured?: boolean;
  imageCount?: number;
  year: number;
  category: string;
  title: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  price: number;
  sellerName: string;
  sellerAvatar: string;
}

const CarCard: React.FC<CarCardProps> = ({
  image,
  id,
  featured,
  imageCount = 1, // chưa sửa lại media image trong DB
  year,
  category,
  title,
  mileage,
  fuelType,
  transmission,
  price,
  sellerName,
  sellerAvatar,
}) => {
  const formatPrice = (price: number) => `${price.toLocaleString()} VND`;
  const formatMileage = (mileage: number) => `${mileage.toLocaleString()} kms`;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {featured && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
          <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <Camera size={12} /> <span>{imageCount}</span>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {year}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-green-500 text-sm font-medium mb-2">
          {category}
        </div>
        <h3 className="text-gray-900 text-lg font-semibold mb-3 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Gauge size={14} />
            <span className="text-xs">{formatMileage(mileage)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={14} />
            <span className="text-xs">{fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings size={14} />
            <span className="text-xs">{transmission}</span>
          </div>
        </div>

        <div className="text-green-500 text-1xl font-bold mb-4">
          {formatPrice(price)}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={sellerAvatar}
              alt={sellerName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-gray-700 text-sm font-medium">
              {sellerName}
            </span>
          </div>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
            View car
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
