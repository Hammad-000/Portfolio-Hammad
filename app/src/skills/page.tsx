
import React from "react";
import {
  SiShadcnui, SiHtml5,SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiTailwindcss, SiNextdotjs,
   SiExpress, SiMongodb, SiMongoose, SiFirebase, SiPostman, SiSupabase, SiGit, SiGithub, SiVercel, SiFramer,
} from "react-icons/si";
import {
  Sparkles,
  Monitor,
  Server,
  Wrench,
} from "lucide-react";

const skillGroups = [
  {
    title: "Frontend Development",
    description:
      "Modern interfaces, responsive layouts and interactive web experiences.",
    icon: Monitor,
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, adaptive: true },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "shadcn/ui", icon: SiShadcnui, adaptive: true },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
    ],
  },
  {
    title: "Backend & Database",
    description:
      "Server-side development, database management and application services.",
    icon: Server,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, adaptive: true },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Mongoose", icon: SiMongoose, color: "#880000" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    ],
  },
  {
    title: "Tools & Workflow",
    description:
      "Version control, API testing and deployment tools.",
    icon: Wrench,
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, adaptive: true },
      { name: "Vercel", icon: SiVercel, adaptive: true },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    ],
  },
];

const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-gray-50 py-20 text-gray-900 dark:bg-[#080d12] dark:text-white md:py-28"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-emerald-400/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* Section heading */}
        <div className="mb-14 text-center md:mb-16">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <Sparkles size={16} />
            My Skills
          </span>

          <h2 className="tech text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Tech{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-400 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
            Technologies I use to build modern, scalable and
            user-friendly web applications.
          </p>
        </div>

        {/* Skill categories */}
        <div className="space-y-8">
          {skillGroups.map((group) => {
            const GroupIcon = group.icon;

            return (
              <div
                key={group.title}
                className="rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm transition-colors duration-300 hover:border-emerald-500/40 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-emerald-400/30 sm:p-7 md:p-8"
              >
                {/* Category heading */}
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <GroupIcon size={23} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold sm:text-xl">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {group.skills.map((skill) => {
                    const SkillIcon = skill.icon;

                    return (
                      <div
                        key={skill.name}
                        className="group flex min-h-[112px] flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-white/[0.025] dark:hover:bg-emerald-400/[0.06]"
                      >
                        <SkillIcon
                          aria-hidden="true"
                          className={`text-3xl transition-transform duration-300 group-hover:scale-110 ${
                            skill.adaptive
                              ? "text-gray-900 dark:text-white"
                              : ""
                          }`}
                          style={
                            skill.adaptive
                              ? undefined
                              : { color: skill.color }
                          }
                        />

                        <span className="text-center text-xs font-semibold text-gray-700 dark:text-gray-300 sm:text-sm">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        
{/* Infinite Tech Stack Marquee */}
<div className="relative mt-14 overflow-hidden border-y border-gray-200 py-6 dark:border-white/10">
  {/* Left fade */}
  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-gray-50 to-transparent dark:from-[#080d12] sm:w-28" />

  {/* Right fade */}
  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-gray-50 to-transparent dark:from-[#080d12] sm:w-28" />

  <div className="mb-5 text-center">
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
      Always Learning · Always Building
    </p>
  </div>

  <div className="group flex overflow-hidden">
    <div className="flex w-max shrink-0 animate-marquee items-center gap-4 pr-4 group-hover:[animation-play-state:paused]">
      {[...skillGroups.flatMap((group) => group.skills),
        ...skillGroups.flatMap((group) => group.skills)
      ].map((skill, index) => {
        const Icon = skill.icon;

        return (
          <div
            key={`${skill.name}-${index}`}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/80 px-5 py-3 transition-colors hover:border-emerald-500/50 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <Icon
              className={`text-2xl ${
                skill.adaptive
                  ? "text-gray-900 dark:text-white"
                  : ""
              }`}
              style={
                skill.adaptive ? undefined : { color: skill.color }
              }
            />
            <span className="whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">
              {skill.name}
            </span>
          </div>
        );
      })}
    </div>
  </div>
</div>


        {/* Footer */}
        <div className="mt-12 flex items-center justify-center gap-3 text-sm text-gray-500">
          <span className="h-px w-10 bg-emerald-500/50" />
          <span className="font-medium">
            Build <span className="text-emerald-500">·</span> Learn{" "}
            <span className="text-emerald-500">·</span> Grow
          </span>
          <span className="h-px w-10 bg-emerald-500/50" />
        </div>
      </div>
    </section>
  );
};

export default Skills;
