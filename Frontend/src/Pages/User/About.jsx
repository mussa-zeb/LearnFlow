import { BookOpen, Sparkles, Users, Clock } from "lucide-react";

const About = () => {
  return (
    <>
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 mb-6">
              About LearnFlow
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
              We're on a mission to make high-quality learning accessible to
              everyone, without barriers or distractions.
            </p>
          </div>
        </div>
      </div>

      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mb-6">
                Learning should be simple
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                We believe that great education shouldn't come with paywalls,
                complicated sign-ups, or endless distractions. LearnFlow is
                built around a simple idea: give people access to thoughtfully
                crafted courses they can learn from at their own pace.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Every course is designed to be clear, practical, and focused on
                what matters most—helping you build real skills without the
                noise.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-100 shadow-sm flex items-center justify-center">
                <BookOpen className="h-20 w-20 text-neutral-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-neutral-50/50 py-16 sm:py-20 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mb-3">
              Our values
            </h2>
            <p className="text-neutral-600">
              The principles that guide everything we build
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900/5 mb-4">
                <BookOpen className="h-5 w-5 text-neutral-900" />
              </div>
              <h3 className="text-base font-medium text-neutral-900 mb-2">
                Clarity first
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                We focus on clear explanations over complexity.
              </p>
            </div>
            <div className="flex flex-col p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900/5 mb-4">
                <Clock className="h-5 w-5 text-neutral-900" />
              </div>
              <h3 className="text-base font-medium text-neutral-900 mb-2">
                Learn at your pace
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                No deadlines, no pressure. Learn when it works for you.
              </p>
            </div>
            <div className="flex flex-col p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900/5 mb-4">
                <Sparkles className="h-5 w-5 text-neutral-900" />
              </div>
              <h3 className="text-base font-medium text-neutral-900 mb-2">
                Quality over quantity
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Every course is curated and thoughtfully crafted.
              </p>
            </div>
            <div className="flex flex-col p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900/5 mb-4">
                <Users className="h-5 w-5 text-neutral-900" />
              </div>
              <h3 className="text-base font-medium text-neutral-900 mb-2">
                Accessible to all
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                No barriers, no logins required for learners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;