import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { Car } from "lucide-react";

type Props = {
  cities?: any[];
  brands?: any[];
};

const CarFilterForm: React.FC<Props> = ({ cities = [], brands = [] }) => {
  const [priceRange, setPriceRange] = useState([528000000, 5000000000]);
  const [kmRange, setKmRange] = useState([0, 300000]);
  const [showNewOnly, setShowNewOnly] = useState(false);

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500";

  const MIN = 0;
  const MAX = 5000000000;
  const STEP = 100000000;
  const formatPrice = (price: number) => {
    if (price >= 1_000_000_000)
      return `${(price / 1_000_000_000).toFixed(1)} tỷ`;
    if (price >= 1_000_000) return `${Math.round(price / 1_000_000)} triệu`;
    return `${price.toLocaleString()} đồng`;
  };

  const formatKm = (km: number) => {
    return `${km.toLocaleString("vi-VN")} Km`;
  };

  // Sample data for demo
  const sampleCities =
    cities.length > 0
      ? cities
      : [
          { id: 1, name: "Hà Nội" },
          { id: 2, name: "Hồ Chí Minh" },
          { id: 3, name: "Đà Nẵng" },
          { id: 4, name: "Cần Thơ" },
        ];

  const sampleBrands =
    brands.length > 0
      ? brands
      : [
          { id: 1, name: "Toyota" },
          { id: 2, name: "Honda" },
          { id: 3, name: "Ford" },
          { id: 4, name: "Hyundai" },
        ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-teal-600 mb-1 flex items-center gap-2">
          <Car className="text-teal-500" size={24} />
          Tìm xe theo tiêu chí của bạn
        </h2>
      </div>

      <div className="space-y-4">
        {/* Hàng 1: Từ Khóa, Vị Trí Xe, Hộp Số, Xuất Xứ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Từ Khóa
            </label>
            <input
              type="text"
              placeholder="Ví dụ: toyota vios 2020"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vị Trí Xe
            </label>
            <select className={inputClass}>
              <option value="">Hồ Chí Minh</option>
              {sampleCities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hộp Số
            </label>
            <select className={inputClass}>
              <option value="">Tất cả</option>
              <option value="Số sàn">Số sàn</option>
              <option value="Tự động">Tự động</option>
              <option value="CVT">CVT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Xuất Xứ
            </label>
            <select className={inputClass}>
              <option value="">Tất cả</option>
              <option value="Trong nước">Trong nước</option>
              <option value="Nhập khẩu">Nhập khẩu</option>
            </select>
          </div>
        </div>

        {/* Hàng 2: Thương Hiệu, Mẫu Xe, Kiểu Dáng, Từ Năm, Đến Năm */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thương Hiệu
            </label>
            <select className={inputClass}>
              <option value="">Tất cả thương hiệu</option>
              {sampleBrands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mẫu Xe
            </label>
            <select className={inputClass}>
              <option value="">Tất cả mẫu xe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kiểu Dáng
            </label>
            <select className={inputClass}>
              <option value="">Tất cả kiểu xe</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Crossover">Crossover</option>
              <option value="Pickup">Pickup</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Từ Năm
            </label>
            <select className={inputClass}>
              <option value="">Chọn năm</option>
              {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đến Năm
            </label>
            <select className={inputClass}>
              <option value="">Chọn năm</option>
              {Array.from({ length: 25 }, (_, i) => 2024 - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hàng 3: Khoảng Giá và Số Km */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Khoảng giá */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Khoảng Giá:{" "}
              <span className="text-teal-600 font-semibold">
                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </span>
            </label>
            <div className="px-2">
              <Range
                values={priceRange}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => setPriceRange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-2 rounded-full"
                    style={{
                      ...props.style,
                      background: getTrackBackground({
                        values: priceRange,
                        colors: ["#e5e7eb", "#14b8a6", "#e5e7eb"],
                        min: MIN,
                        max: MAX,
                      }),
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="h-6 w-6 bg-teal-500 rounded-full shadow-lg border-2 border-white"
                    style={{
                      ...props.style,
                    }}
                  />
                )}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0</span>
                <span>5.0 tỷ</span>
              </div>
            </div>
          </div>

          {/* Số Km */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Số Km Tối Đa:{" "}
              <span className="text-teal-600 font-semibold">
                {formatKm(kmRange[1])}
              </span>
            </label>
            <div className="px-2">
              <Range
                values={[kmRange[1]]}
                step={10000}
                min={0}
                max={300000}
                onChange={(values) => setKmRange([0, values[0]])}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-2 rounded-full"
                    style={{
                      ...props.style,
                      background: getTrackBackground({
                        values: [kmRange[1]],
                        colors: ["#14b8a6", "#e5e7eb"],
                        min: 0,
                        max: 300000,
                      }),
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="h-6 w-6 bg-teal-500 rounded-full shadow-lg border-2 border-white"
                    style={{
                      ...props.style,
                    }}
                  />
                )}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0</span>
                <span>300000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hàng 4: Checkbox và Submit */}
        <div className="flex items-center justify-between pt-4">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={showNewOnly}
              onChange={(e) => setShowNewOnly(e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            Chỉ hiển thị xe mới
          </label>

          <button
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            TÌM KIẾM
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarFilterForm;
