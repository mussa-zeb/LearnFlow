const Terms = () => {
  return (
    <>
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 mb-3">
            Terms of Service
          </h1>
          <p className="text-neutral-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="w-full bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-neutral prose-sm sm:prose-base max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p className="text-neutral-600 leading-relaxed">
            By accessing and using LearnFlow, you accept and agree to be bound
            by the terms and provisions of this agreement.
          </p>
          <h2>2. Use License</h2>
          <p className="text-neutral-600 leading-relaxed">
            Permission is granted to temporarily access the materials on
            LearnFlow for personal, non-commercial transitory viewing only.
          </p>
          <h2>3. Disclaimer</h2>
          <p className="text-neutral-600 leading-relaxed">
            The materials on LearnFlow are provided on an 'as is' basis.
            LearnFlow makes no warranties, expressed or implied.
          </p>
        </div>
      </div>
    </>
  );
};

export default Terms;