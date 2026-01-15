export default function LoginPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form className="max-w-md">
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign In</button>
      </form>
    </div>
  );
}
