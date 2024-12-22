import { Testimonial } from "@/types/testimonial";
import SectionTitle from "./section";
import SingleTestimonial from "./singletestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Sidhanta Dutta",
    designation: "Founder @ZQG",
    content:
      "As the owner of ZQG Esports, finding a reliable and innovative web development team was crucial for us. Partnering with grwm was one of the best decisions we made. They not only understood our vision but also brought it to life in ways we hadn’t imagined.",
    image: "/images/testimonials/author-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Sanya Mehra",
    designation: "Founder @ PulseDigital",
    content:
      "I would highly recommend GRWM , to anyone looking for a reliable and talented team to build or upgrade their website. They deliver results with integrity and expertise, making them a valuable asset to any business looking to thrive in the digital landscape.",
    image: "/images/testimonials/author-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "Ananya Kapoor",
    designation: "Founder @ StellarTech",
    content:
      "Their customer service is top-notch. Any questions or concerns we had were addressed promptly and professionally. The entire team showed a genuine interest in our success, and it felt like they were partners rather than just service providers.Highly recommended ",
    image: "/images/testimonials/author-03.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2 md:py-[120px]">
      <div className="container px-4">
        <SectionTitle
          subtitle="Testimonials"
          title="What our Client Say"
          paragraph="Discover why our clients rave about their experience with us in their own words."
          width="640px"
          center
        />
        <div className="mt-[60px] lg:mt-20">

          {/* Layout for small screens (scrollable) */}
          <div className="flex flex-nowrap gap-x-8 overflow-x-auto no-scrollbar md:hidden">
            {testimonialData.map((testimonial, i) => (
              <div key={i} className="flex-none w-[300px]">
                <SingleTestimonial testimonial={testimonial} />
              </div>
            ))}
          </div>

          {/* Layout for large screens (grid style) */}
          <div className="mt-[60px] flex flex-wrap lg:mt-20 gap-y-8 hidden md:flex">
            {testimonialData.map((testimonial, i) => (
              <SingleTestimonial key={i} testimonial={testimonial} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;



