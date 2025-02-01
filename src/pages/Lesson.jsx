import { useState } from "react";

// Lesson data
const lessons = [
  { id: 1, title: "Variables 🎯", emoji: "📦", color: "bg-yellow-400" },
  { id: 2, title: "Loops 🔁", emoji: "🎢", color: "bg-blue-400" },
  { id: 3, title: "Conditionals 🤔", emoji: "⚖️", color: "bg-green-400" },
  { id: 4, title: "Functions 🛠️", emoji: "🔄", color: "bg-purple-400" },
  { id: 5, title: "Arrays 📚", emoji: "📖", color: "bg-pink-400" },
  { id: 6, title: "Objects 🎭", emoji: "🎩", color: "bg-orange-400" },
  { id: 7, title: "Events 🎬", emoji: "🎉", color: "bg-red-400" },
  { id: 8, title: "Operators ➕", emoji: "🔢", color: "bg-teal-400" },
  { id: 9, title: "Data Types 🔠", emoji: "🔣", color: "bg-indigo-400" },
  { id: 10, title: "Debugging 🐞", emoji: "🔍", color: "bg-gray-400" }
];


export default function Lessons() {
  
  const [completedLessons] = useState(
    JSON.parse(localStorage.getItem("completedLessons")) || []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Choose a Lesson!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <a
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className={`${lesson.color} p-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-200 text-white relative`}
            >
              
              {completedLessons.includes(lesson.id.toString()) && (
                <div className="absolute top-2 right-2 text-2xl">✅</div>
              )}
              <div className="text-6xl mb-4">{lesson.emoji}</div>
              <h3 className="text-2xl font-bold">{lesson.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
