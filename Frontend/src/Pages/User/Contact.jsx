import { Mail, MessageSquare, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <>
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 mb-6">
              Get in touch
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>
        </div>
      </div>

      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex flex-col p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900/5 mb-4">
                <Mail className="h-5 w-5 text-neutral-900" />
              </div>
              <h3 className="text-base font-medium text-neutral-900 mb-2">
                Email
              </h3>
              <p className="text-sm text-neutral-600">hello@learnflow.com</p>
            </div>
            <div className="flex flex-col p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900/5 mb-4">
                <MessageSquare className="h-5 w-5 text-neutral-900" />
              </div>
              <h3 className="text-base font-medium text-neutral-900 mb-2">
                Support
              </h3>
              <p className="text-sm text-neutral-600">support@learnflow.com</p>
            </div>
            <div className="flex flex-col p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900/5 mb-4">
                <MapPin className="h-5 w-5 text-neutral-900" />
              </div>
              <h3 className="text-base font-medium text-neutral-900 mb-2">
                Location
              </h3>
              <p className="text-sm text-neutral-600">Remote-first, Worldwide</p>
            </div>
          </div>

          <div className="mt-12 max-w-2xl mx-auto">
            <form className="space-y-6 rounded-3xl border border-neutral-100 bg-white p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-100"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-100"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-100 resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-neutral-800 hover:shadow-md"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;