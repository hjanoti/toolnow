"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/* --------------------------------- state -------------------------------- */

interface Experience {
  id: string;
  role: string;
  company: string;
  from: string;
  to: string;
  bullets: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  from: string;
  to: string;
}

interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  links: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string;
}

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function emptyExperience(): Experience {
  return { id: makeId(), role: "", company: "", from: "", to: "", bullets: "" };
}

function emptyEducation(): Education {
  return { id: makeId(), degree: "", institution: "", from: "", to: "" };
}

function emptyResume(): ResumeData {
  return {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    links: "",
    summary: "",
    experiences: [emptyExperience()],
    education: [emptyEducation()],
    skills: "",
  };
}

interface ResumeStore extends ResumeData {
  setField: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
  updateExperience: (id: string, patch: Partial<Experience>) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  updateEducation: (id: string, patch: Partial<Education>) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  clearAll: () => void;
}

const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      ...emptyResume(),
      setField: (key, value) => set({ [key]: value }),
      updateExperience: (id, patch) =>
        set((s) => ({
          experiences: s.experiences.map((e) =>
            e.id === id ? { ...e, ...patch } : e
          ),
        })),
      addExperience: () =>
        set((s) => ({ experiences: [...s.experiences, emptyExperience()] })),
      removeExperience: (id) =>
        set((s) => ({
          experiences: s.experiences.filter((e) => e.id !== id),
        })),
      updateEducation: (id, patch) =>
        set((s) => ({
          education: s.education.map((e) =>
            e.id === id ? { ...e, ...patch } : e
          ),
        })),
      addEducation: () =>
        set((s) => ({ education: [...s.education, emptyEducation()] })),
      removeEducation: (id) =>
        set((s) => ({ education: s.education.filter((e) => e.id !== id) })),
      clearAll: () => set(emptyResume()),
    }),
    { name: "toolnow-resume-draft" }
  )
);

/* ------------------------------- component ------------------------------ */

const noopSubscribe = () => () => {};

/** True only after client hydration (no setState-in-effect). */
function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export default function ResumeBuilder() {
  // Hydration gate: the persisted localStorage draft must not be rendered
  // during SSR/hydration or the markup would mismatch.
  const hydrated = useHydrated();
  if (!hydrated) {
    return (
      <Card>
        <CardContent className="pt-5">
          <p className="text-sm text-ink-500" role="status">
            Loading your saved resume draft…
          </p>
        </CardContent>
      </Card>
    );
  }
  return <ResumeEditor />;
}

function ResumeEditor() {
  const store = useResumeStore();
  const skills = store.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  function handleClear() {
    if (confirm("Clear the entire resume? This cannot be undone.")) {
      store.clearAll();
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <style>{`@media print {
        body * { visibility: hidden !important; }
        .print-area, .print-area * { visibility: visible !important; }
        .print-area { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; max-width: none !important; margin: 0 !important; }
      }`}</style>

      <div className="no-print space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Personal details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="rb-name">Full name</Label>
              <Input
                id="rb-name"
                value={store.name}
                placeholder="Asha Verma"
                onChange={(e) => store.setField("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rb-title">Professional title</Label>
              <Input
                id="rb-title"
                value={store.title}
                placeholder="Frontend Engineer"
                onChange={(e) => store.setField("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rb-email">Email</Label>
              <Input
                id="rb-email"
                type="email"
                value={store.email}
                placeholder="asha@example.com"
                onChange={(e) => store.setField("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rb-phone">Phone</Label>
              <Input
                id="rb-phone"
                type="tel"
                value={store.phone}
                placeholder="+91 98765 43210"
                onChange={(e) => store.setField("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rb-location">Location</Label>
              <Input
                id="rb-location"
                value={store.location}
                placeholder="Bengaluru, India"
                onChange={(e) => store.setField("location", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rb-links">Links (comma-separated)</Label>
              <Input
                id="rb-links"
                value={store.links}
                placeholder="linkedin.com/in/asha, github.com/asha"
                onChange={(e) => store.setField("links", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="rb-summary" className="sr-only">
              Professional summary
            </Label>
            <Textarea
              id="rb-summary"
              rows={3}
              value={store.summary}
              placeholder="Frontend engineer with 5 years building high-traffic React apps…"
              onChange={(e) => store.setField("summary", e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {store.experiences.map((exp, i) => (
              <fieldset
                key={exp.id}
                className="rounded-xl border border-ink-200 p-4"
              >
                <legend className="px-1 text-xs font-semibold tracking-wide text-ink-500 uppercase">
                  Role {i + 1}
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label htmlFor={`rb-exp-role-${exp.id}`}>Role / title</Label>
                    <Input
                      id={`rb-exp-role-${exp.id}`}
                      value={exp.role}
                      placeholder="Senior Developer"
                      onChange={(e) =>
                        store.updateExperience(exp.id, { role: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`rb-exp-company-${exp.id}`}>Company</Label>
                    <Input
                      id={`rb-exp-company-${exp.id}`}
                      value={exp.company}
                      placeholder="Acme Corp"
                      onChange={(e) =>
                        store.updateExperience(exp.id, {
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`rb-exp-from-${exp.id}`}>From</Label>
                    <Input
                      id={`rb-exp-from-${exp.id}`}
                      value={exp.from}
                      placeholder="Jun 2022"
                      onChange={(e) =>
                        store.updateExperience(exp.id, { from: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`rb-exp-to-${exp.id}`}>To</Label>
                    <Input
                      id={`rb-exp-to-${exp.id}`}
                      value={exp.to}
                      placeholder="Present"
                      onChange={(e) =>
                        store.updateExperience(exp.id, { to: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <Label htmlFor={`rb-exp-bullets-${exp.id}`}>
                    Achievements (one per line)
                  </Label>
                  <Textarea
                    id={`rb-exp-bullets-${exp.id}`}
                    rows={3}
                    value={exp.bullets}
                    placeholder={
                      "Cut page load time 40% by code-splitting the checkout flow\nLed a team of 4 engineers shipping 3 releases per month"
                    }
                    onChange={(e) =>
                      store.updateExperience(exp.id, {
                        bullets: e.target.value,
                      })
                    }
                  />
                </div>
                {store.experiences.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-red-600 hover:bg-red-50"
                    onClick={() => store.removeExperience(exp.id)}
                  >
                    Remove role
                  </Button>
                )}
              </fieldset>
            ))}
            <Button type="button" variant="secondary" onClick={store.addExperience}>
              + Add role
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {store.education.map((edu, i) => (
              <fieldset
                key={edu.id}
                className="rounded-xl border border-ink-200 p-4"
              >
                <legend className="px-1 text-xs font-semibold tracking-wide text-ink-500 uppercase">
                  Education {i + 1}
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label htmlFor={`rb-edu-degree-${edu.id}`}>
                      Degree / course
                    </Label>
                    <Input
                      id={`rb-edu-degree-${edu.id}`}
                      value={edu.degree}
                      placeholder="B.Tech, Computer Science"
                      onChange={(e) =>
                        store.updateEducation(edu.id, {
                          degree: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`rb-edu-inst-${edu.id}`}>Institution</Label>
                    <Input
                      id={`rb-edu-inst-${edu.id}`}
                      value={edu.institution}
                      placeholder="IIT Delhi"
                      onChange={(e) =>
                        store.updateEducation(edu.id, {
                          institution: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`rb-edu-from-${edu.id}`}>From</Label>
                    <Input
                      id={`rb-edu-from-${edu.id}`}
                      value={edu.from}
                      placeholder="2016"
                      onChange={(e) =>
                        store.updateEducation(edu.id, { from: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`rb-edu-to-${edu.id}`}>To</Label>
                    <Input
                      id={`rb-edu-to-${edu.id}`}
                      value={edu.to}
                      placeholder="2020"
                      onChange={(e) =>
                        store.updateEducation(edu.id, { to: e.target.value })
                      }
                    />
                  </div>
                </div>
                {store.education.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-red-600 hover:bg-red-50"
                    onClick={() => store.removeEducation(edu.id)}
                  >
                    Remove entry
                  </Button>
                )}
              </fieldset>
            ))}
            <Button type="button" variant="secondary" onClick={store.addEducation}>
              + Add education
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="rb-skills">Skills (comma-separated)</Label>
            <Input
              id="rb-skills"
              value={store.skills}
              placeholder="React, TypeScript, Node.js, PostgreSQL, AWS"
              onChange={(e) => store.setField("skills", e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => window.print()}>
            Print / Save as PDF
          </Button>
          <Button type="button" variant="destructive" onClick={handleClear}>
            Clear all
          </Button>
        </div>
        <p className="text-xs text-ink-500">
          ATS-friendly single-column layout. Your draft autosaves to this
          browser&apos;s local storage — nothing is uploaded anywhere.
        </p>
      </div>

      {/* ------------------------- A4 preview ------------------------- */}
      <div>
        <h2 className="no-print mb-3 text-sm font-semibold tracking-wide text-ink-500 uppercase">
          Live preview
        </h2>
        <div className="print-area mx-auto w-full max-w-[794px] rounded-lg border border-ink-200 bg-white p-8 text-[13px] leading-relaxed text-ink-900 shadow-sm sm:p-10">
          <header className="border-b-2 border-ink-900 pb-4">
            <h3 className="text-3xl font-extrabold tracking-tight text-ink-950">
              {store.name || "Your Name"}
            </h3>
            {store.title && (
              <div className="mt-0.5 text-base font-semibold text-ink-700">
                {store.title}
              </div>
            )}
            <div className="mt-2 text-ink-600">
              {[store.email, store.phone, store.location, store.links]
                .filter(Boolean)
                .join("  ·  ") || "email · phone · location"}
            </div>
          </header>

          {store.summary && (
            <section className="mt-4">
              <h4 className="text-xs font-extrabold tracking-[0.15em] text-ink-950 uppercase">
                Summary
              </h4>
              <p className="mt-1.5 whitespace-pre-line">{store.summary}</p>
            </section>
          )}

          {store.experiences.some((e) => e.role || e.company || e.bullets) && (
            <section className="mt-4">
              <h4 className="text-xs font-extrabold tracking-[0.15em] text-ink-950 uppercase">
                Experience
              </h4>
              {store.experiences
                .filter((e) => e.role || e.company || e.bullets)
                .map((exp) => (
                  <div key={exp.id} className="mt-2.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <div className="font-bold text-ink-950">
                        {exp.role || "Role"}
                        {exp.company && (
                          <span className="font-semibold text-ink-600">
                            {" "}
                            — {exp.company}
                          </span>
                        )}
                      </div>
                      {(exp.from || exp.to) && (
                        <div className="text-ink-500">
                          {[exp.from, exp.to].filter(Boolean).join(" – ")}
                        </div>
                      )}
                    </div>
                    {exp.bullets.trim() && (
                      <ul className="mt-1 list-disc space-y-0.5 pl-5">
                        {exp.bullets
                          .split("\n")
                          .map((b) => b.replace(/^[-•*]\s*/, "").trim())
                          .filter(Boolean)
                          .map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
            </section>
          )}

          {store.education.some((e) => e.degree || e.institution) && (
            <section className="mt-4">
              <h4 className="text-xs font-extrabold tracking-[0.15em] text-ink-950 uppercase">
                Education
              </h4>
              {store.education
                .filter((e) => e.degree || e.institution)
                .map((edu) => (
                  <div
                    key={edu.id}
                    className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4"
                  >
                    <div>
                      <span className="font-bold text-ink-950">
                        {edu.degree || "Degree"}
                      </span>
                      {edu.institution && (
                        <span className="text-ink-600">
                          {" "}
                          — {edu.institution}
                        </span>
                      )}
                    </div>
                    {(edu.from || edu.to) && (
                      <div className="text-ink-500">
                        {[edu.from, edu.to].filter(Boolean).join(" – ")}
                      </div>
                    )}
                  </div>
                ))}
            </section>
          )}

          {skills.length > 0 && (
            <section className="mt-4">
              <h4 className="text-xs font-extrabold tracking-[0.15em] text-ink-950 uppercase">
                Skills
              </h4>
              <ul className="mt-1.5 flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-ink-300 px-2 py-0.5 text-xs font-semibold text-ink-800"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
