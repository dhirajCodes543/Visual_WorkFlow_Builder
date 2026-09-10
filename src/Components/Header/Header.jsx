import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Visual Workflow Builder
      </Link>

      <Link
        to="/workFlows"
        className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Previous Workflow`s
      </Link>
    </header>
  );
}

export default Header;