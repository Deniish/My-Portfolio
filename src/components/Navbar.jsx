export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-80 backdrop-blur-lg text-white px-6 py-4 flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold">MyPortfolio</h1>
      <ul className="flex gap-6">
        <li><a href="#about" className="hover:text-blue-400">About</a></li>
        <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
        <li><a href="#skills" className="hover:text-blue-400">Skills</a></li>
        <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
      </ul>
    </nav>
  );
}
