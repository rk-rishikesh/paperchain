import React from "react";
import { Link } from "react-router-dom";
import { content } from "../Content";

const Skills = () => {
  const { skills } = content;

  return (
    <section className="min-h-fit bg-bg_light_primary" id="skills">
      <div className="md:container px-5 py-14">
        <h2 className="title" data-aos="fade-down">
          {skills.title}
        </h2>
        <h4 className="subtitle1" data-aos="fade-down">
          {skills.subtitle}
        </h4>
        <br />
        <div className="flex flex-wrap gap-4 justify-center">
          {skills.skills_content.map((skill, i) => (
            <div
              key={i}
              data-aos="fade-up"
              className=" sm:cursor-pointer 
               relative group w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md"
            >
              <div class="flex items-center p-3 w-72 h-28 bg-white rounded-md shadow-lg">
                <section class="flex justify-center items-center w-14 h-14 rounded-full shadow-md hover:cursor-pointer hover:scale-110 duration-300">
                  <img
                    src={skill.logo}
                    alt="..."
                    className="w-10 group-hover:scale-125 duration-50"
                  />
                </section>

                <section class="block border-l border-gray-300 m-3">
                  <div class="pl-3">
                    <Link to={`/${skill.name.toLowerCase().replace(" ", "-")}`}>
                      <h3 class="bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-lg font-bold">
                        {skill.name}
                      </h3>
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
