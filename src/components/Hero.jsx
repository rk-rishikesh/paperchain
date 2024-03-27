import { useEffect } from "react";
import { content } from "../Content";

const Hero = () => {
  const { hero } = content;

  return (
    <section id="home" className="overflow-hidden relative">
      {/* Image */}
      <img
        src={hero.image}
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "74.123vw",
          height: "100vh",
          opacity: 1.0,
          position: "absolute", // Ensure image is below text content
        }}
        data-aos="slide-up"
        alt="..."
        className="h-full object-cover"
      />

      {/* Text content */}
      <div className="min-h-screen relative flex md:flex-row flex-col-reverse md:items-end justify-center items-center">
        <div
          data-aos="slide-left"
          data-aos-delay="1000"
          className="absolute h-100 md:w-3/12 w-8/12 top-0 right-0 bottom-0 -z-10"
          style={{ backgroundColor: "#092526" }}
        >
          <h1 className="rotate-90 absolute top-[50%] right-[-15%] text-[#FFFFFF]">
            <span style={{ color: "#8C8665" }}>{hero.firstName}</span>{" "}
            <span style={{ color: "#F2D8A7" }}>{hero.LastName}</span>
          </h1>
        </div>

        {/* Text content */}
        <div className="pb-16 px-6 pt-5 text-center" data-aos="fade-down">
          <h2>{hero.title}</h2>
          <br />
          <div className="flex flex-col gap-10 mt-10 z-10">
            {" "}
            {/* Adjust z-index to ensure text is above image */}
            {/*hero.hero_content.map((content, i) => (
              <div
                key={i}
                data-aos="fade-down"
                data-aos-delay={i * 300}
                className={`flex items-center w-80 gap-5
                ${i === 1 && " flex-row-reverse text-right"}  `}
              >
                <h3>{content.count}</h3>
                <p>{content.text}</p>
              </div>
            ))*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
