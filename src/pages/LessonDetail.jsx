import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const formatMessage = (text) => {
  // Helper function to wrap content in story section
  const wrapInStorySection = (content) => `
    <div class="mb-6">
      <div class="inline-block bg-pink-200 px-4 py-2 rounded-full font-bold text-xl mb-4">
        📚 Story Time!
      </div>
      <div class="bg-pink-50 p-6 rounded-2xl shadow-sm space-y-4 text-lg leading-relaxed">
        ${content}
      </div>
    </div>
  `;

  // Split the text into sections
  let formattedText = text
    // Format the story section
    .replace(
      /(Once upon a time|Let me tell you a story|Here's a fun story)(.*?)(?=\*\*Assignment:\*\*|\*\*Follow-up Question:\*\*|$)/is,
      (match, intro, content) => wrapInStorySection(intro + content)
    )

    // Format Assignment section
    .replace(
      /\*\*Assignment:\*\*(.*?)(?=\*\*Follow-up Question:\*\*|$)/s,
      `<div class="mb-6">
        <div class="inline-block bg-yellow-200 px-4 py-2 rounded-full font-bold text-xl mb-4">
          ✏️ Your Fun Task!
        </div>
        <div class="bg-yellow-50 p-6 rounded-2xl shadow-sm space-y-4 text-lg">
          $1
        </div>
      </div>`
    )

    // Format Follow-up Question section
    .replace(
      /\*\*Follow-up Question:\*\*(.*?)(?=$)/s,
      `<div class="mb-6">
        <div class="inline-block bg-purple-200 px-4 py-2 rounded-full font-bold text-xl mb-4">
          🤔 Think About This...
        </div>
        <div class="bg-purple-50 p-6 rounded-2xl shadow-sm space-y-4 text-lg">
          $1
        </div>
      </div>`
    )

    // Format code examples
    .replace(
      /`([^`]+)`/g,
      `<div class="bg-white border-2 border-blue-200 p-4 rounded-xl my-4 font-mono text-lg shadow-sm">
        <div class="flex items-center gap-2 mb-2 text-blue-600">
          <span class="text-xl">💻</span>
          <span class="font-bold">Code Magic:</span>
        </div>
        <code>$1</code>
      </div>`
    )

    // Format variable mentions
    .replace(
      /\b(variable|variables)\b/gi,
      '<span class="bg-purple-200 px-2 py-1 rounded-lg font-semibold">$1</span>'
    )

    // Format important keywords
    .replace(
      /\*\*([^*]+)\*\*/g,
      '<span class="font-bold text-purple-700">$1</span>'
    )

    // Format emojis
    .replace(
      /([\u{1F300}-\u{1F9FF}])/gu,
      '<span class="text-2xl inline-block align-middle mx-1">$1</span>'
    )

    // Format numbered lists
    .replace(
      /(\d+\.\s)([^\n]+)/g,
      `<div class="flex items-start gap-3 my-2">
        <span class="text-2xl">🌟</span>
        <span class="flex-1">$1$2</span>
      </div>`
    );

  
  return `<div class="space-y-4">${formattedText}</div>`;
};

export default function LessonDetail() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const { id: lessonId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isAssessment, setIsAssessment] = useState(false);
  const [character, setCharacter] = useState("robot");
  const [isLoading, setIsLoading] = useState(false);

  const characters = {
    robot: {
      emoji: "🤖",
      name: "Robo",
      style: "bg-blue-100 border-blue-300",
      buttonStyle: "bg-blue-500 hover:bg-blue-600",
    },
  };

  const [completedLessons, setCompletedLessons] = useState(
    JSON.parse(localStorage.getItem("completedLessons")) || []
  );

  const markComplete = () => {
    const updated = [...new Set([...completedLessons, lessonId])];
    setCompletedLessons(updated);
    localStorage.setItem("completedLessons", JSON.stringify(updated));
  };

  const handleAIResponse = async (prompt) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );

      setIsLoading(false);

      const responseText =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response.";
      return responseText;
    } catch (error) {
      setIsLoading(false);
      console.error("API Error:", error.message);
      return "Error: Unable to generate a response. Please try again.";
    }
  };

  

  const teachConcept = async () => {
    const lessonTopic = getLessonTopic(lessonId);
    const conceptPrompt = `Explain ${lessonTopic} to a 6-year-old using a fun story and give a simple example with emojis. Then, give an assignment for the child to try, and finally, ask a follow-up question related to the topic.`;
    const conceptExplanation = await handleAIResponse(conceptPrompt);

    setMessages((prev) => [...prev, { type: "ai", text: conceptExplanation }]);
  };

  const startAssessment = async () => {
    const lessonTopic = getLessonTopic(lessonId);
    const assessmentPrompt = `Create a simple Python coding assessment question about ${lessonTopic}.`;
    const question = await handleAIResponse(assessmentPrompt);

    setMessages((prev) => [...prev, { type: "ai", text: question }]);
    setIsAssessment(true);
  };

  const getLessonTopic = (id) => {
    switch (id) {
      case "1":
        return "variables";
      case "2":
        return "loops";
      case "3":
        return "conditionals";
      case "4":
        return "Functions";
      case "5":
        return "Arrays";
      case "6":
        return "Objects";
      case "7":
        return "Events";
      case "8":
        return "Operators";
      case "9":
        return "Data Types";
      case "10":
        return "Debugging";
      default:
        return "Python programming";
    }
  };

  useEffect(() => {
    teachConcept();
  }, [lessonId]);

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <div className="container mx-auto p-4 bg-gradient-to-b from-purple-50 to-blue-50 mt-[4rem]">
        <div className="max-w-3xl mx-auto">
          
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="chat-container h-96 overflow-y-auto space-y-4 px-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`rounded-2xl ${
                    msg.type === "ai"
                      ? "bg-white border-2 border-blue-200 shadow-md"
                      : "bg-purple-100 border-2 border-purple-300"
                  }`}
                >
                  {msg.type === "ai" ? (
                    <div className="overflow-hidden">
                      {/* Tutor Header */}
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white rounded-t-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">
                            {characters[character].emoji}
                          </span>
                          <span className="text-xl font-bold">
                            {characters[character].name} is teaching you!
                          </span>
                        </div>
                      </div>

                      
                      <div className="p-6">
                        <div
                          className="prose max-w-none text-lg leading-relaxed space-y-4"
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(msg.text),
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                   
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">👤</span>
                        <span className="font-bold text-purple-600">
                          Your Answer:
                        </span>
                      </div>
                      <div className="text-lg">{msg.text}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Assessment Section - same as before */}
            {!isAssessment ? (
              <div className="flex justify-center mt-6">
                <button
                  onClick={startAssessment}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xl font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">🔄</span> Thinking...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Take the Challenge! 🧠
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all text-lg"
                  placeholder="Write your answer here..."
                  rows={4}
                />
                <button
                  onClick={async () => {
                    const result = await handleAIResponse(
                      `Check this code: ${input}`
                    );
                    setMessages((prev) => [
                      ...prev,
                      { type: "user", text: input },
                      { type: "ai", text: result },
                    ]);
                    setInput("");

                    if (
                      result.toLowerCase().includes("correct") ||
                      result.toLowerCase().includes("good job")
                    ) {
                      markComplete();
                      setMessages((prev) => [
                        ...prev,
                        {
                          type: "ai",
                          text: "🎉 Correct answer! Great job! Redirecting to lessons page...",
                        },
                      ]);
                      setTimeout(() => {
                        navigate("/lessons");
                      }, 2000);
                    } else {
                      setMessages((prev) => [
                        ...prev,
                        {
                          type: "ai",
                          text: "❌ Incorrect answer. Please try again!",
                        },
                      ]);
                    }
                  }}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-xl font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">🔄</span> Checking...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Submit Answer ✨
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
