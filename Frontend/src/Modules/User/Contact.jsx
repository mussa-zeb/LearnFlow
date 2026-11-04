import { useState } from "react";
import { Mail, MessageSquare, MapPin, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

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
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Header Section */}
      <div className="w-full bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
              Get in touch
            </h1>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Have a question, feedback, or need help with a course? Fill out the form below and our team will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Info Card 1 */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-neutral-900 text-white shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                <p className="text-neutral-300 text-sm mb-2">Our friendly team is here to help.</p>
                <a href="mailto:hello@learnflow.com" className="text-white font-medium hover:underline">
                  hello@learnflow.com
                </a>
              </div>
            </div>

            {/* Info Card 2 */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                <MessageSquare className="h-6 w-6 text-neutral-900" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">Support</h3>
                <p className="text-neutral-600 text-sm mb-2">Need technical assistance?</p>
                <a href="mailto:support@learnflow.com" className="text-neutral-900 font-medium hover:underline">
                  support@learnflow.com
                </a>
              </div>
            </div>

            {/* Info Card 3 */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                <MapPin className="h-6 w-6 text-neutral-900" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">Location</h3>
                <p className="text-neutral-600 text-sm mb-2">We are a remote-first team.</p>
                <p className="text-neutral-900 font-medium">Worldwide</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-10 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Send us a message</h2>

              {error && (
                <div className="mb-6 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800 ring-1 ring-red-200">
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              {submitted && (
                <div className="mb-6 flex items-start gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800 ring-1 ring-green-200">
                  <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-600" />
                  <span>Thanks! Your message has been received. We'll be in touch soon.</span>
                </div>
              )}

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 transition-all resize-none"
                    placeholder="How can we help you today?"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-4 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-neutral-800 hover:shadow-lg"
                >
                  Send Message
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;