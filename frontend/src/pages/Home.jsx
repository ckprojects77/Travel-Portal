import PageTransition from "../components/layout/PageTransition";
import Hero from "../components/home/Hero";
import PopularDestinations from "../components/home/PopularDestinations";
import FeaturedPackages from "../components/home/FeaturedPackages";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <PopularDestinations />
      <FeaturedPackages />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </PageTransition>
  );
}
