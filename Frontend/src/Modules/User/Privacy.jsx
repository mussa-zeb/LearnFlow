const Privacy = () => {
  return (
    <>
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-neutral-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="w-full bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-neutral prose-sm sm:prose-base max-w-none">
          <h2>1. Information We Collect</h2>
          <p className="text-neutral-600 leading-relaxed">
            LearnFlow is designed to be used without creating an account. We do
            not collect personal information unless explicitly provided.
          </p>
          <h2>2. Cookies</h2>
          <p className="text-neutral-600 leading-relaxed">
            We may use minimal cookies to improve your experience on our site.
          </p>
          <h2>3. Changes to This Policy</h2>
          <p className="text-neutral-600 leading-relaxed">
            We may update our Privacy Policy from time to time. Any changes
            will be posted on this page.
          </p>
        </div>
      </div>
    </>
  );
};

export default Privacy;