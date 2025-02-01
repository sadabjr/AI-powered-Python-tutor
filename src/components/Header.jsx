import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl">👨‍🎓</span>
          <Link to="/">
            <span className="text-2xl font-bold text-indigo-600">
              PythonKids
            </span>
          </Link>
        </div>
        <button
          onClick={() => navigate("/lessons")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          My Lessons
        </button>
      </div>
    </header>
  );
};

export default Header;
