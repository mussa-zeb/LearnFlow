import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Users,
  Compass,
  Play,
  ChevronDown,
  Map,
  Layers,
} from "lucide-react";
import { useEffect, useState } from "react";
import { coursesApi, categoriesApi, roadmapsApi } from "../../Shared/utils/api.js";
import CourseCard from "../../Shared/components/CourseCard";
import { getCategoryIcon } from "../../Shared/utils/categoryIcons";

// Import all images
import hero1 from "../../assets/hero-1.png";
import hero2 from "../../assets/hero-2.png";
import hero3 from "../../assets/hero-3.png";
import promoBanner from "../../assets/promo-banner.png";

const benefits = [
  {
    title: "Learn anywhere",
    description: "Pick up a lesson wherever you have time to learn.",
    icon: BookOpen,
  },
  {
    title: "Learn at your pace",
    description: "Move through lessons at a speed that works for you.",
    icon: Clock3,
  },
  {
    title: "Explore new skills",
    description: "Find subjects that help you take your next step.",
    icon: Compass,
  },
  {
    title: "A clear place to start",
    description: "Browse courses and choose what interests you.",
    icon: Users,
  },
];

const faqs = [
  {
    question: "Can I browse courses without an account?",
    answer:
      "Yes. You can explore the available courses without creating an account.",
  },
  {
    question: "How do I find a course?",
    answer:
      "Browse the courses page or start with one of the popular topics on this page.",
  },
  {
    question: "Who adds courses to LearnFlow?",
    answer:
      "Courses are added and managed by the LearnFlow administrator.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Yes. LearnFlow is designed to let you explore lessons on a schedule that suits you.",
  },
];

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const [coursesRes, popularRes, roadmapsRes] = await Promise.all([
          coursesApi.getAll(),
          categoriesApi.getPopular(),
          roadmapsApi.getAll(),
        ]);
        if (active) {
          setCourses(
            Array.isArray(coursesRes.data) ? coursesRes.data.slice(0, 3) : []
          );
          setPopularCategories(
            Array.isArray(popularRes.data) ? popularRes.data : []
          );
          setRoadmaps(
            Array.isArray(roadmapsRes.data) ? roadmapsRes.data.slice(0, 3) : []
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const scrollToFeatured = () => {
    document.getElementById("featured")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <main className="overflow-hidden bg-white text-neutral-950">
      {/* Hero - FORCED SIDE-BY-SIDE ON MOBILE */}
      <section className="relative isolate h-auto lg:h-[90vh]">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1fr] items-center gap-3 px-4 pb-12 pt-8 sm:gap-10 sm:px-8 sm:pb-20 sm:pt-16 lg:min-h-[570px] lg:grid-cols-[0.88fr_1.12fr] lg:gap-8 lg:px-10 lg:py-16">
          <div className="relative z-10 max-w-xl">
            <h1 className="text-[1.65rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-5xl lg:text-[4.35rem] lg:leading-[1.04] lg:tracking-[-0.065em]">
              Your learning journey starts here.
            </h1>

            <p className="mt-3 text-[11px] leading-5 text-neutral-600 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              Explore practical courses, discover new interests, and build
              skills one lesson at a time.
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:gap-3">
              <Link
                to="/courses"
                className="inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-full bg-black px-4 text-[10px] font-semibold text-white transition-colors hover:bg-neutral-800 sm:min-h-12 sm:gap-2 sm:px-6 sm:text-sm"
              >
                Browse courses
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
              <button
                type="button"
                onClick={scrollToFeatured}
                className="inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 text-[10px] font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 sm:min-h-12 sm:gap-2 sm:px-6 sm:text-sm"
              >
                <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                Explore courses
              </button>
            </div>
          </div>

          {/* Editorial photo composition */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[65/47]">
            <div className="absolute right-[5%] top-[1%] h-[76%] w-[47%] rotate-[7deg] overflow-hidden rounded-[16px] sm:rounded-[34px] bg-neutral-100 shadow-sm">
              <img
                src={hero1}
                alt="Students walking on campus"
                className="h-full w-full object-cover grayscale"
              />
            </div>
            <div className="absolute left-[5%] top-[22%] z-10 h-[60%] w-[48%] -rotate-[9deg] overflow-hidden rounded-[14px] sm:rounded-[30px] border-[3px] sm:border-[7px] border-white bg-neutral-100 shadow-lg">
              <img
                src={hero2}
                alt="Student coding on a laptop"
                className="h-full w-full object-cover grayscale"
              />
            </div>
            <div className="absolute bottom-[-5%] right-[9%] z-20 h-[50%] w-[48%] -rotate-[5deg] overflow-hidden rounded-[12px] sm:rounded-[28px] border-[3px] sm:border-[7px] border-white bg-neutral-100 shadow-lg">
              <img
                src={hero3}
                alt="Person reading in a modern library"
                className="h-full w-full object-cover grayscale"
              />
            </div>
            <div className="absolute bottom-[5%] left-[7%] h-8 w-8 sm:h-16 sm:w-16 lg:h-24 lg:w-24 rounded-[10px] sm:rounded-[20px] bg-neutral-100/80" />
            <div className="absolute right-[1%] top-[0%] h-6 w-6 sm:h-14 sm:w-14 lg:h-20 lg:w-20 rounded-[8px] sm:rounded-[18px] bg-neutral-100" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="min-h-[142px] rounded-2xl bg-neutral-50 px-4 py-6 text-center sm:px-6"
            >
              <Icon className="mx-auto h-6 w-6 stroke-[1.7]" />
              <h2 className="mt-4 text-sm font-semibold text-neutral-900">
                {title}
              </h2>
              <p className="mx-auto mt-1.5 max-w-[210px] text-xs leading-5 text-neutral-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular topics */}
      {popularCategories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-8 lg:px-10">
          <div className="grid gap-7 lg:grid-cols-[260px_1fr] lg:items-center lg:gap-10">
            <div className="border-l-2 border-neutral-200 pl-5">
              <span className="mb-4 block h-px w-8 bg-neutral-500" />
              <h2 className="text-3xl font-semibold tracking-[-0.05em]">
                Popular topics
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Find a subject that fits your goals and curiosity.
              </p>
              <Link
                to="/courses"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                View all courses <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {popularCategories.map((cat) => {
                const Icon = getCategoryIcon(cat.icon);
                return (
                  <Link
                    key={cat._id}
                    to={`/courses?category=${cat._id}`}
                    className="flex min-h-[58px] items-center gap-3 rounded-full bg-neutral-50 px-4 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
                  >
                    <Icon className="h-5 w-5 shrink-0 stroke-[1.7]" />
                    <span className="leading-tight">{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Promotional banner - Corrected Height & Clean Overlay */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-8 lg:px-10">
        <div className="relative isolate flex h-[130px] items-center overflow-hidden rounded-[16px] sm:h-[280px] sm:rounded-[24px]">
          <img
            src={promoBanner}
            alt="Professional working on laptop"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-right"
          />
          
          {/* Only the one-sided gradient for text readability */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          
          <div className="flex w-full max-w-lg flex-col items-start justify-center px-5 py-4 text-white sm:px-10 sm:py-8">
            <h2 className="text-lg font-semibold tracking-[-0.045em] sm:text-3xl lg:text-4xl">
              Invest in yourself.
            </h2>
            <p className="mt-1 max-w-[200px] text-[9px] leading-4 text-neutral-200 sm:mt-2 sm:max-w-xs sm:text-sm sm:leading-6">
              Make time for learning today and take another step toward tomorrow.
            </p>
            <Link
              to="/courses"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-black transition-colors hover:bg-neutral-200 sm:mt-5 sm:gap-2 sm:px-5 sm:py-3 sm:text-xs"
            >
              Find your next course <ArrowRight className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section
        id="featured"
        className="scroll-mt-24 bg-neutral-50/70 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
          <div className="mb-9 flex items-end justify-between gap-4">
            <div>
              <span className="mb-3 block h-px w-8 bg-neutral-500" />
              <h2 className="text-3xl font-semibold tracking-[-0.05em]">
                Featured courses
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                A few places to begin your learning journey.
              </p>
            </div>
            <Link
              to="/courses"
              className="mb-1 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-500"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-neutral-200 bg-white"
                >
                  <div className="aspect-[16/9] animate-pulse bg-neutral-200" />
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-neutral-100" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-neutral-400" />
              <h3 className="mt-4 text-lg font-semibold">No courses yet</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-500">
                New courses will appear here when the administrator adds them.
              </p>
              <Link
                to="/courses"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
              >
                Explore courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Learning roadmaps */}
      {roadmaps.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-10">
          <div className="mb-9 flex items-end justify-between gap-4">
            <div>
              <span className="mb-3 block h-px w-8 bg-neutral-500" />
              <h2 className="text-3xl font-semibold tracking-[-0.05em]">
                Learning roadmaps
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Follow a structured path from first lesson to confidence.
              </p>
            </div>
            <Link
              to="/roadmap"
              className="mb-1 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-500"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {roadmaps.map((rm) => (
              <Link
                key={rm._id}
                to={`/roadmap/${rm._id}`}
                className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white transition-transform group-hover:scale-110">
                  <Map className="h-5 w-5" />
                </div>
                <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-neutral-900 group-hover:text-neutral-700">
                  {rm.title}
                </h3>
                <p className="mb-4 line-clamp-2 flex-1 text-sm text-neutral-600">
                  {rm.description}
                </p>

                {(rm.categories || []).length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1">
                    {rm.categories.slice(0, 2).map((c) => (
                      <span
                        key={c._id || c}
                        className="inline-flex items-center rounded-full bg-neutral-50 px-2 py-0.5 text-[10px] font-medium text-neutral-700 ring-1 ring-neutral-100"
                      >
                        {c.name}
                      </span>
                    ))}
                    {rm.categories.length > 2 && (
                      <span className="inline-flex items-center rounded-full bg-neutral-50 px-2 py-0.5 text-[10px] font-medium text-neutral-700 ring-1 ring-neutral-100">
                        +{rm.categories.length - 2}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between border-t border-neutral-50 pt-4">
                  <span className="flex items-center gap-1 text-xs font-medium text-neutral-500">
                    <Layers className="h-3.5 w-3.5" />
                    {rm.contentType === "pdf"
                      ? "PDF Guide"
                      : `${rm.steps?.length || 0} Steps`}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-neutral-900 transition-all group-hover:gap-2">
                    View <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10 lg:py-20">
        <div>
          <span className="mb-3 block h-px w-8 bg-neutral-500" />
          <h2 className="max-w-sm text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
            A few things you might want to know.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-600">
            Quick answers to help you get started with LearnFlow.
          </p>
          <Link
            to="/courses"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-black"
          >
            Explore the courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-semibold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400"
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="max-w-2xl pb-5 pr-8 text-sm leading-6 text-neutral-600">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final call to action */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 rounded-[20px] bg-neutral-950 px-6 py-7 text-white sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <div className="flex items-center gap-4">
            <BookOpen className="h-7 w-7 shrink-0 stroke-[1.5]" />
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                Ready to start learning?
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Explore courses and find something worth learning.
              </p>
            </div>
          </div>
          <Link
            to="/courses"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Browse courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;