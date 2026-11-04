import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Do I need to create an account to learn?",
    answer:
      "No. You can browse and start learning any course instantly without signing up or logging in.",
  },
  {
    question: "Can I access courses on mobile?",
    answer:
      "Yes. LearnFlow is fully responsive and works great on desktop, tablet, and mobile devices.",
  },
  {
    question: "How long do I have access to courses?",
    answer:
      "All courses are available to access anytime. You can learn at your own pace and come back whenever you'd like.",
  },
  {
    question: "Can I download course content?",
    answer:
      "Currently, courses are available to stream online. We're always looking to add offline support in the future.",
  },
  {
    question: "How do I become an instructor/admin?",
    answer:
      "Admin access is managed through the backend configuration. If you're interested in contributing courses, please reach out via our contact page.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 mb-6">
              Frequently asked questions
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
              Quick answers to common questions about LearnFlow
            </p>
          </div>
        </div>
      </div>

      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? -1 : index)
                  }
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors duration-150 hover:bg-neutral-50/50"
                >
                  <h3 className="text-base sm:text-lg font-medium text-neutral-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-neutral-500 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <p className="text-neutral-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;