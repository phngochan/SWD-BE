import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate for redirection
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "../../utils/axiosInstance";
import { motion } from "framer-motion";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false); // State for modal
  const navigate = useNavigate(); // Hook for navigation
  const [cart, setCart] = useState([]);
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  useEffect(() => {
    setCart(cartData);
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/questions");
        setQuestions(response.data);
      } catch (error) {
        setError("Failed to load questions. Please try again later.");
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelection = (weight, questionId, answerText) => {
    setAnswers((prevAnswers) => [
      ...prevAnswers.filter((answer) => answer.questionId !== questionId),
      { questionId, weight, answerText },
    ]);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmitQuiz = async () => {
    console.log("Submitting answers:", answers); // Debug: Kiểm tra xem answers có dữ liệu không

    try {
      const response = await axios.post(
        "/api/quiz-results/save",
        { answers }
      );

      console.log("Response from server:", response.data); // Debug: Kiểm tra phản hồi từ server
      setQuizResult(response.data.quizResult);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      if (error.response?.status === 401) {
        setShowLoginModal(true); // Show login modal if unauthorized
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 text-center">
        {error}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <Navbar cart={cart} setCart={setCart} /> {/* Pass setCart to Navbar */}
      <div className="bg-white p-6 m-8 rounded-xl shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-semibold text-center pacifico-regular text-gray-800 mb-8">
          Trắc nghiệm chăm sóc da
        </h2>

        <div className="text-center mb-4">
          <p>
            Câu hỏi {currentQuestionIndex + 1} trong {questions.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#A7DFEC] h-2 rounded-full"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg text-gray-700 mb-4">{currentQuestion.questionText}</p>
          <div className="space-y-4">
            {currentQuestion.answerOptions?.map((option, index) => {
              const isSelected = answers.some(
                (answer) =>
                  answer.questionId === currentQuestion._id &&
                  answer.answerText === option.answerText
              );
              return (
                <button
                  key={index}
                  className={`w-full py-3 px-4 ${isSelected ? "bg-[#c9e7ee]" : "bg-gray-200"
                    } hover:bg-gray-300 text-left rounded-lg transition-all transform hover:scale-105 duration-150`}
                  onClick={() =>
                    handleAnswerSelection(option.weight, currentQuestion._id, option.answerText)
                  }
                >
                  {option.answerText}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center pacifico-regular">
          {currentQuestionIndex > 0 && (
            <button
              className="py-2 px-6 bg-[#A7DFEC] text-white rounded-lg hover:bg-[#2B6A7C] transition"
              onClick={handlePrevQuestion}
            >
              Trước
            </button>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              disabled={!answers.some(answer => answer.questionId === currentQuestion._id)}
              className={`py-2 px-6 ${!answers.some(answer => answer.questionId === currentQuestion._id)
                ? "bg-gray-300"
                : "bg-[#A7DFEC]"
                } text-white rounded-lg hover:bg-[#2B6A7C] transition`}
              onClick={handleNextQuestion}
            >
              Tiếp
            </button>
          ) : (
            <button
              className="py-2 px-6 bg-[#2B6A7C] text-white rounded-lg hover:bg-[#2B6A7C] transition"
              onClick={handleSubmitQuiz}
            >
              Xem kết quả
            </button>
          )}
        </div>
      </div>

      {quizResult && (
        <div className="fixed inset-0 bg-[#faf5f0] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pacifico-regular">
              Loại da của bạn: {quizResult.skinType}
            </h3>
            <p>{quizResult.recommendation}</p>
            <button
              className="mt-4 py-2 px-6 bg-[#A7DFEC] text-white rounded-lg hover:bg-[#2B6A7C] transition"
              onClick={() => setQuizResult(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pacifico-regular">
              Bạn cần đăng nhập để xem kết quả. Bạn có muốn đăng nhập ngay không?
            </h3>
            <div className="flex justify-center space-x-4"> {/* Add spacing between buttons */}
              <button
                className="py-2 px-6 bg-[#A7DFEC] text-white rounded-lg hover:bg-[#2B6A7C] transition"
                onClick={() => navigate("/dang-nhap")} // Navigate to login page
              >
                Đăng nhập
              </button>
              <button
                className="py-2 px-6 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 tran  sition"
                onClick={() => setShowLoginModal(false)} // Close modal
              >
                Không muốn
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Now Button */}
      <div className="fixed bottom-4 right-4">
        {/* Ping effect */}
        <span className="absolute -inset-1 inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>

        {/* Animated Button */}
        <motion.button
          onClick={() => navigate("/dịch vụ")} // Navigate to services page
          className="relative px-6 py-3 text-white rounded-full shadow-lg pacifico-regular focus:outline-none focus:ring-4 focus:ring-green-300"
          style={{
            background: "linear-gradient(135deg, #6B8E23, #32CD32)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
          animate={{
            y: [0, -5, 5, -5, 0], // Floating animation
            transition: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          Đặt dịch vụ ngay
        </motion.button>
      </div>

      <Footer />
    </div>
  );
};

export default Quiz;