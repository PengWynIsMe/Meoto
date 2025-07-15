import { Link } from "@remix-run/react";
import { useState } from "react";

export default function Header({ headerData }: { headerData: any }) {
  console.log("LOGO:", headerData.logo);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const menu = headerData.menu_items || [];

  const getImageUrl = (url: string) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `http://127.0.0.1:1337${url}`;
  };

  const renderDropdownContent = (subItems: any[]) => {
    if (!subItems || subItems.length === 0) return null;

    return (
      <div className="absolute left-1/2 top-full transform -translate-x-1/2 bg-white shadow-xl border-t-2 border-teal-400 z-50 min-w-[1000px] max-w-[1200px]">
        <div className="px-6 py-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Type Filter (2/12) */}
            <div className="col-span-2 space-y-6">
              {subItems
                .filter((section) =>
                  section.section_title.toLowerCase().includes("type")
                )
                .map((section) => (
                  <div key={section.id}>
                    <div className="space-y-3">
                      {section.items.map((item: any) => (
                        <Link
                          key={item.id}
                          to={item.link || "#"}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 rounded-lg transition-colors border-l-4 border-transparent hover:border-teal-400"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Middle Column - Car Types (5/12) */}
            <div className="col-span-5">
              {subItems
                .filter((section) =>
                  section.section_title.toLowerCase().includes("kiểu dáng")
                )
                .map((section) => (
                  <div key={section.id}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                      {section.section_title}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {section.items.slice(0, 6).map((item: any) => (
                        <Link
                          key={item.id}
                          to={item.link || "#"}
                          className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
                        >
                          {item.image?.url && (
                            <div className="w-18 h-12 mb-2 flex items-center justify-center">
                              <img
                                src={getImageUrl(item.image.url)}
                                alt={item.label}
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                              />
                            </div>
                          )}
                          <span className="text-xs text-gray-600 group-hover:text-teal-600 font-medium text-center leading-tight">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link
                        to="#"
                        className="inline-flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium"
                      >
                        xem tất cả
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>

            {/* Right Column - Car Brands (5/12) */}
            <div className="col-span-5">
              {subItems
                .filter((section) =>
                  section.section_title.toLowerCase().includes("thương hiệu")
                )
                .map((section) => (
                  <div key={section.id}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-300">
                      {section.section_title}
                    </h3>
                    <div className="grid grid-cols-4 gap-3 gap-x-6 gap-y-4">
                      {section.items.slice(0, 8).map((item: any) => (
                        <Link
                          key={item.id}
                          to={item.link || "#"}
                          className="group flex items-center justify-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 h-12"
                        >
                          {item.image?.url && (
                            <img
                              src={getImageUrl(item.image.url)}
                              alt={item.label}
                              className="max-w-16 max-h-16 object-contain group-hover:scale-105 transition-transform"
                            />
                          )}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link
                        to="#"
                        className="inline-flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium"
                      >
                        xem tất cả
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="border-b shadow-sm bg-white text-black">
      <nav className="flex items-center justify-between px-6 py-4 mx-auto">
        {/* Left */}
        <div className="flex flex-col items-start">
          <Link to="/" className="flex items-center gap-2">
            {headerData.logo?.url && (
              <img
                src={getImageUrl(headerData.logo.url)}
                alt="Logo"
                className="w-14 h-18"
              />
            )}
          </Link>
          <span className="text-sm text-gray-300">
            {headerData.slogan || "Your Tagline Here"}
          </span>
        </div>

        {/* Middle */}
        <div className="flex gap-6 items-center">
          {menu.map((item: any) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() =>
                item.sub_items?.length > 0 && setActiveDropdown(item.id)
              }
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.Link || "#"}
                className="text-black font-medium hover:text-green-600 flex items-center gap-1"
              >
                {item.Label}
                {item.sub_items?.length > 0 && (
                  <i
                    className={`ri-arrow-down-s-line transition-transform ${
                      activeDropdown === item.id ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>
              {item.sub_items?.length > 0 &&
                activeDropdown === item.id &&
                renderDropdownContent(item.sub_items)}
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-black">
          <div className="flex items-center gap-4 text-black">
            <Link to="/search" className="hover:text-green-400">
              <i className="ri-search-line text-xl" />
            </Link>

            <Link
              to="/wishlist"
              className="pl-4 ml-4 border-l border-gray-400 hover:text-green-400"
            >
              <i className="ri-heart-line text-xl" />
            </Link>

            <Link
              to="/account"
              className="pl-4 ml-4 border-l border-gray-400 hover:text-green-400"
            >
              <i className="ri-user-3-line text-xl" />
            </Link>

            <div className="flex items-center">
              <Link to="/login" className="hover:text-green-400">
                Đăng nhập
              </Link>
              <span>/</span>
              <Link to="/register" className="hover:text-green-400">
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
