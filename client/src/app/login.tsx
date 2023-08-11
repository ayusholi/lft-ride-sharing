export default function LoginPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md outline-none focus:border-teal-500"
              placeholder="Your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md outline-none focus:border-teal-500"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
