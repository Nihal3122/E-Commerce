import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import productCategory from "../helpers/Category";
import axios from "axios";
import CategoryWiseProduct from "../components/CategoryWiseProduct";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [selectCategory, setSeleceCategory] = useState({});

  const getData = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/products/filter-product",
      { category: filterCategoryList },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setData(response?.data?.products || []);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;

    setSeleceCategory((prev) => {
      return { ...prev, [value]: checked };
    });
  };

  useEffect(() => {
    getData();
  }, [filterCategoryList]);
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryName) => {
        if (selectCategory[categoryName]) {
          return categoryName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);
  }, [selectCategory]);

  return (
    <>
      <Header />
      <div className="mt-16  p-4  ">
        {/* Dekstop Version */}
        <div className="hidden lg:grid grid-cols-[300px,1fr] pl-10 ">
          {/* Left Side */}
          <div className="bg-white p-2 h-[650px] w-[300px] sticky top-24 shadow-md">
            {/* Filter By Categories */}
            <div className="">
              <h3 className="text-lg ml-3 uppercase font-normal  border-b border-slate-300 pb-1 mt-7">
                Category
              </h3>
              <form className="text-base ml-5 flex flex-col gap-2 py-2">
                {productCategory.map((category, index) => {
                  return (
                    <div className="flex items-center gap-3" key={index}>
                      <input
                        type="checkbox"
                        id={category?.value}
                        name={"category"}
                        onChange={handleSelectCategory}
                        value={category?.value}
                        checked={selectCategory[category?.value]}
                      />
                      <label htmlFor={category?.value}>{category?.label}</label>
                    </div>
                  );
                })}
              </form>
            </div>
          </div>
          {/* Right Side (Products) */}
          <div className="">
            <div className="">
              {data && <CategoryWiseProduct category={filterCategoryList} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProduct;
