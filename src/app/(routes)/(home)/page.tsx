import About from "@/sections/about";
import Benefits from "@/sections/benefits";
import Contact from "@/sections/contact";
import Hero from "@/sections/hero";
import Impact from "@/sections/impact";
import Products from "@/sections/products";
import Services from "@/sections/services";
import Team from "@/sections/team";
import Testimonial from "@/sections/testimonial";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Services />
      <Products />
      <Benefits />
      <Impact />
      <About />
      <Team />
      <Testimonial />
      <Contact />
    </div>
  );
};

export default HomePage;