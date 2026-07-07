import Benefits from "@/sections/benefits";
import Hero from "@/sections/hero";
import Testimonial from "@/sections/testimonial";

const HomePage = () => {
  return (
    <div className="flex min-h-[200vh] flex-col">
      <Hero />
      <Benefits />
      <Testimonial />
    </div>
  );
};

export default HomePage;