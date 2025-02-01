import { useNavigate } from "react-router-dom";


export default function HomePage() {

  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <main className="container mx-auto px-4 pt-24 pb-16">
      
        <div className="flex justify-center gap-8 mb-12">
          <div className="animate-bounce delay-100">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <span className="text-indigo-600 text-2xl">🤖</span>
            </div>
          </div>
          <div className="animate-bounce delay-200">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
              <span className="text-blue-600 text-2xl">✨</span>
            </div>
          </div>
          <div className="animate-bounce delay-300">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
              <span className="text-green-600 text-2xl">🧠</span>
            </div>
          </div>
        </div>

    
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl font-bold text-gray-900 animate-fade-in">
            Learn Python with Your AI Friend!
          </h1>
          
          <div className="space-y-6">
            <p className="text-xl text-gray-600 leading-relaxed animate-slide-up">
              Welcome to PythonKids, where learning to code is fun and easy! 
              Our friendly AI tutor will guide you through interactive Python lessons, 
              helping you understand programming concepts through engaging examples and exercises.
            </p>
            
            <p className="text-xl text-gray-600 leading-relaxed animate-slide-up delay-200">
              Start your coding adventure today and discover how exciting programming can be. 
              With personalized feedback and interactive challenges, you'll be writing Python code in no time!
            </p>
          </div>

          <div className="pt-8 animate-slide-up delay-300">
            <button onClick={() => navigate("/lessons")} className="group relative bg-indigo-600 text-white text-xl px-12 py-4 rounded-full hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg cursor-pointer">
              <span className="flex items-center gap-2">
                Start Learning 
                <span className="transform group-hover:translate-x-1 transition-transform">
                  ✨
                </span>
              </span>
            
              <div className="absolute inset-0 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-25 blur-xl transition-opacity" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}


// Add custom animations to Tailwind
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slide-up {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
  
  .animate-slide-up {
    animation: slide-up 1s ease-out forwards;
  }
  
  .delay-100 {
    animation-delay: 100ms;
  }
  
  .delay-200 {
    animation-delay: 200ms;
  }
  
  .delay-300 {
    animation-delay: 300ms;
  }
`;
document.head.appendChild(style);