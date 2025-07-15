import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { Car } from "lucide-react";

type Props = {
  cities?: any[];
  brands?: any[];
  onSearch?: (filters: any) => Promise<void>;
};

const CarFilterForm: React.FC<Props> = ({
  cities = [],
  brands = [],
  onSearch,
}) => {
  const [priceRange, setPriceRange] = useState([0, 5000000000]);
  const [kmRange, setKmRange] = useState([0, 300000]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [gear, setGear] = useState("");
  const [origin, setOrigin] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [style, setStyle] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");

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

  const formatKm = (km: number) => `${km.toLocaleString("vi-VN")} Km`;

  const sampleCities = cities.length
    ? cities
    : [
        { id: 1, name: "Hà Nội" },
        { id: 2, name: "Hồ Chí Minh" },
        { id: 3, name: "Đà Nẵng" },
        { id: 4, name: "Cần Thơ" },
      ];

  const sampleBrands = brands.length
    ? brands
    : [
        { id: 1, name: "Toyota" },
        { id: 2, name: "Honda" },
        { id: 3, name: "Ford" },
        { id: 4, name: "Hyundai" },
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filters = {
      keyword,
      location,
      gear,
      origin,
      brand,
      model,
      style,
      yearFrom,
      yearTo,
      priceRange,
      kmRange,
      showNewOnly,
    };
    if (onSearch) {
      await onSearch(filters);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md space-y-6 border border-gray-100"
    >
      <h2 className="text-xl font-bold text-teal-600 flex items-center gap-2">
        <Car size={24} /> Tìm xe theo tiêu chí của bạn
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          className={inputClass}
          placeholder="Từ khóa (VD: Vios 2021)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select
          className={inputClass}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Vị trí xe</option>
          {sampleCities.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          className={inputClass}
          value={gear}
          onChange={(e) => setGear(e.target.value)}
        >
          <option value="">Hộp số</option>
          <option value="Số sàn">Số sàn</option>
          <option value="Tự động">Tự động</option>
          <option value="CVT">CVT</option>
        </select>
        <select
          className={inputClass}
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        >
          <option value="">Xuất xứ</option>
          <option value="Trong nước">Trong nước</option>
          <option value="Nhập khẩu">Nhập khẩu</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <select
          className={inputClass}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">Thương hiệu</option>
          {sampleBrands.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
        <select
          className={inputClass}
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="">Mẫu xe</option>
        </select>
        <select
          className={inputClass}
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          <option value="">Kiểu dáng</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Crossover">Crossover</option>
          <option value="Pickup">Pickup</option>
        </select>
        <select
          className={inputClass}
          value={yearFrom}
          onChange={(e) => setYearFrom(e.target.value)}
        >
          <option value="">Từ năm</option>
          {Array.from({ length: 25 }, (_, i) => 2024 - i).map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
        <select
          className={inputClass}
          value={yearTo}
          onChange={(e) => setYearTo(e.target.value)}
        >
          <option value="">Đến năm</option>
          {Array.from({ length: 25 }, (_, i) => 2024 - i).map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Khoảng giá */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Khoảng Giá:{" "}
            <span className="text-teal-600 font-semibold">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </span>
          </label>
          <Range
            values={priceRange}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={setPriceRange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 rounded-full bg-gray-200"
                style={{
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
                className="h-6 w-6 bg-teal-500 rounded-full shadow border-2 border-white"
              />
            )}
          />
        </div>

        {/* Số km */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số Km Tối Đa:{" "}
            <span className="text-teal-600 font-semibold">
              {formatKm(kmRange[1])}
            </span>
          </label>
          <Range
            values={[kmRange[1]]}
            step={10000}
            min={0}
            max={300000}
            onChange={(v) => setKmRange([0, v[0]])}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 rounded-full bg-gray-200"
                style={{
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
                className="h-6 w-6 bg-teal-500 rounded-full shadow border-2 border-white"
              />
            )}
          />
        </div>
      </div>

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
          className="px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          TÌM KIẾM
        </button>
      </div>
    </form>
  );
};

export default CarFilterForm;
