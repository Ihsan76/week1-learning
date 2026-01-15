import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Week1</h1>
        <ul className="flex gap-6">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/settings">Settings</Link></li>
        </ul>
      </div>
    </nav>
  );
}
