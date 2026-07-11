import React from 'react';
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiSupabase,
} from 'react-icons/si';

const Skills: React.FC = () => {
  const skills = [
    { name: "HTML", icon: SiHtml5, color: "#E34F26" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "Express.js", icon: SiExpress, color: "#000000" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  ];

  const allSkills = [...skills, ...skills];

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 md:py-20 overflow-hidden">
      <div className="w-full px-4 lg:px-8">
        <h2 className=" tech mb-12  text-center text-4xl md:text-5xl font-extrabold tracking-tight  bg-clip-text text-transparent animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out">
          Tech I work with
        </h2>
        <div className="relative w-full">
          {/* Gradient overlays for smooth edge fading */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none" />

          <div className="marquee-track flex w-max animate-marquee whitespace-nowrap py-4">
            {allSkills.map((skill, idx) => (
              <div
                key={idx}
                className="skill-card mx-4 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-200 dark:border-gray-700"
              >
                <skill.icon className="text-2xl" style={{ color: skill.color }} />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Skills;