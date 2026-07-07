import About from "@/sections/about";
import Benefits from "@/sections/benefits";
import Contact from "@/sections/contact";
import Hero from "@/sections/hero";
import Impact from "@/sections/impact";
import Services from "@/sections/services";
import Testimonial from "@/sections/testimonial";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Services />
      <Benefits />
      <Impact />
      <About />
      <Testimonial />
      <Contact />
    </div>
  );
};

export default HomePage;