
"use client";

import { useEffect, useState } from "react";

type Day = {
  date: string;
  count: number;
  level: number;
};

export default function GitHubContributions() {
  const [days, setDays] = useState<Day[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadContributions() {
      try {
        const response = await fetch(
          "https://github-contributions-api.jogruber.de/v4/Hammad-000?y=last"
        );

        if (!response.ok) {
          throw new Error("Failed to load contributions");
        }

        const data = await response.json();

        setDays(data.contributions ?? []);
        setTotal(data.total?.lastYear ?? 0);
      } catch {
        setError(true);
      }
    }

    loadContributions();
  }, []);

  const weeks: Day[][] = [];

  days.forEach((day, index) => {
    if (index % 7 === 0) weeks.push([]);
    weeks[weeks.length - 1].push(day);
  });

  const colors = [
    "#161b22",
    "#0e4429",
    "#006d32",
    "#26a641",
    "#39d353",
  ];

  return (
 <section
  id="github"
  className="px-4 py-20 text-foreground sm:px-6"
>
  <div className="mx-auto max-w-6xl">
    <div className="mb-8">
      

      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        GitHub Contributions
      </h2>

      <p className="mt-3 text-sm text-foreground/60">
        A little progress every day adds up.
      </p>

    </div>

    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4 shadow-sm sm:p-6">

 <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4 sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#e6edf3]">
              <span className="font-semibold">
                {total.toLocaleString()}
              </span>{" "}
              contributions in the last year
            </p>

            <a
              href="https://github.com/Hammad-000"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#e6edf3]"
            >
              View profile ↗
            </a>
          </div>

          {error || days.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#9198a1]">
              {error
                ? "Contribution graph load nahi ho saka. Thori dair baad refresh karo."
                : "Loading GitHub contributions..."}
            </p>
          ) : (
            <div className="overflow-x-auto pb-3">
              <div className="min-w-[680px]">
                <div className="grid grid-cols-[32px_1fr] gap-2">
                  <div className="grid grid-rows-7 gap-[3px] text-[10px] text-[#9198a1]">
                    <span />
                    <span>Mon</span>
                    <span />
                    <span>Wed</span>
                    <span />
                    <span>Fri</span>
                    <span />
                  </div>

                  <div className="flex gap-[3px]">
                    {weeks.map((week, weekIndex) => (
                      <div
                        key={weekIndex}
                        className="grid flex-1 grid-rows-7 gap-[3px]"
                      >
                        {Array.from({ length: 7 }, (_, dayIndex) => {
                          const day = week[dayIndex];

                          if (!day) {
                            return <span key={dayIndex} />;
                          }

                          return (
                            <div
                              key={day.date}
                              title={`${day.count} contributions on ${day.date}`}
                              className="aspect-square min-w-0 rounded-[2px] outline outline-1 outline-white/[0.04] transition hover:outline-white/50"
                              style={{
                                backgroundColor:
                                  colors[Math.min(day.level, 4)],
                              }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#30363d] pt-4">
            <a
              href="https://github.com/Hammad-000"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#3fb950] hover:underline"
            >
              Hammad-000 on GitHub
            </a>

            <div className="flex items-center gap-1.5 text-xs text-[#9198a1]">
              Less
              {colors.map((color) => (
                <span
                  key={color}
                  className="h-3 w-3 rounded-[2px]"
                  style={{ backgroundColor: color }}
                />
              ))}
              More
            </div>
          </div>
        </div>
    </div>
  </div>
</section>
  );
}

