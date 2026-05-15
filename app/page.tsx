"use client";

import Link from "next/link";
import { Hammer, Search, PlusCircle, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptMC00VjI0SDI0djJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-emerald-100 backdrop-blur-sm">
              <Hammer className="h-4 w-4" />
              Connecting homeowners with local tradespeople
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find Local Tradespeople{" "}
              <span className="text-emerald-200">Fast</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-emerald-100/90">
              Post your home service needs and let qualified tradespeople in your area find you. From plumbing to painting, get the job done right.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/requests"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-emerald-700 shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-50 hover:shadow-xl"
              >
                <Search className="h-4 w-4" />
                View Requests
              </Link>
              <Link
                href="/post-request"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20"
              >
                <PlusCircle className="h-4 w-4" />
                Post a Request
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              How It Works
            </h2>
            <p className="mt-3 text-gray-500">
              Three simple steps to get your home service needs met
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Post Your Request",
                description: "Describe the job, choose a category, and share your location. It takes less than a minute.",
              },
              {
                step: "2",
                title: "Tradespeople Browse",
                description: "Local professionals see your request and can pick up the job that matches their skills.",
              },
              {
                step: "3",
                title: "Get It Done",
                description: "Track the status of your request from Open to In Progress to Closed. Simple and transparent.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Service Categories
            </h2>
            <p className="mt-3 text-gray-500">
              We cover the trades you need most
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Plumbing", icon: "Wrench", desc: "Leaks, installations, and repairs" },
              { name: "Electrical", icon: "Zap", desc: "Wiring, outlets, and fuse boxes" },
              { name: "Painting", icon: "Paintbrush", desc: "Interior and exterior painting" },
              { name: "Joinery", icon: "Ruler", desc: "Custom woodwork and shelving" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/requests?category=${cat.name}`}
                className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  {cat.name === "Plumbing" && <Hammer className="h-5 w-5" />}
                  {cat.name === "Electrical" && <Search className="h-5 w-5" />}
                  {cat.name === "Painting" && <PlusCircle className="h-5 w-5" />}
                  {cat.name === "Joinery" && <ArrowRight className="h-5 w-5" />}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{cat.desc}</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-emerald-600 transition-colors group-hover:text-emerald-700">
                  Browse <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-700 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mt-3 text-emerald-100">
            Post your first request and find a local tradesperson today.
          </p>
          <Link
            href="/post-request"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50"
          >
            <PlusCircle className="h-4 w-4" />
            Post a Request
          </Link>
        </div>
      </section>
    </div>
  );
}
