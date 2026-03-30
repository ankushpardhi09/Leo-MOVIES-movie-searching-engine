const SignInPage = () => {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="bg-dark-800 border border-dark-600 rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
        <p className="text-gray-400 text-sm mb-6">Access your watchlist and personalized movie picks.</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="input-field w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input-field w-full"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
