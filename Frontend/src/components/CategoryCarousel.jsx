import React from "react";
import { Carousel, CarouselContent , CarouselItem , CarouselPrevious , CarouselNext } from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Graphic Designer",
  "Fullstack Developer",
  "Data Science",
];

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (categoryName) => {
    dispatch(setSearchedQuery(categoryName.trim().toLowerCase()));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button
                className="bg-black text-white rounded-full px-6"
                onClick={() => searchJobHandler(cat)} // ✅ inline arrow
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="border-none" />
        <CarouselNext className="border-none" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
