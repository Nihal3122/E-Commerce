import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryList from "../components/CategoryList";
import BannerProducts from "../components/BannerProducts";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <>
      <Header />
      <CategoryList />
      <BannerProducts />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct
        category={"watches"}
        heading={"Popular's Watches"}
      />
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"earphones"} heading={"Wire Earphones"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct
        category={"camera"}
        heading={"Camera & Photography"}
      />
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"speakers"} heading={"Speakers"} />

      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
      <div className="h-[40px]"></div>
      <Footer />
    </>
  );
};

export default Home;
