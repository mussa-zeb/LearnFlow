import { useState } from "react";
import { Mail, MessageSquare, MapPin, CheckCircle, AlertCircle } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields before sending.");
      return;
    }

    // Demo: no backend endpoint exists yet. Show confirmation.
    // To wire it up later, POST `form` to e.g. /api/contact here.
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

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
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-3xl border border-neutral-100 bg-white p-6 sm:p-8 shadow-sm"
            >
              {error && (
                <div className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700 ring-1 ring-red-100">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {submitted && (
                <div className="flex items-start gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-sm text-green-700 ring-1 ring-green-100">
                  <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Thanks! Your message has been received (demo).</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-900 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-100"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-900 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-100"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-900 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-100 resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <button
                type="submit"
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