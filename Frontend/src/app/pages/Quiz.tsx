import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { Clock, CheckCircle2, XCircle, Award } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export function Quiz() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizComplete, setQuizComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: 'What does REST stand for in web development?',
      options: [
        'Representational State Transfer',
        'Remote Execution State Transfer',
        'Relational State Transfer',
        'Resource Execution State Transfer',
      ],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: 'Which programming language is known for its use in Data Science and Machine Learning?',
      options: ['Java', 'Python', 'C++', 'Ruby'],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: 'Which of the following is NOT a JavaScript framework?',
      options: ['React', 'Vue', 'Django', 'Angular'],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: 'What does API stand for?',
      options: [
        'Application Programming Interface',
        'Advanced Programming Interface',
        'Application Process Integration',
        'Advanced Process Interface',
      ],
      correctAnswer: 0,
    },
  ];

  useEffect(() => {
    if (quizComplete) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setQuizComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] ?? null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getTimeColor = () => {
    if (timeLeft < 60) return 'text-red-500';
    if (timeLeft < 180) return 'text-orange-500';
    return 'text-green-500';
  };

  if (quizComplete) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
        <Navbar onMenuClick={() => setSidebarOpen(true)} showMenu />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="lg:ml-64 pt-16">
          <div className="p-6 md:p-8 max-w-2xl mx-auto">
            <GlassCard className="p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-6 flex items-center justify-center">
                <Award className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-4xl font-bold mb-4">Quiz Complete!</h1>
              
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                {score}/{questions.length}
              </div>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                You scored {percentage.toFixed(0)}%
              </p>

              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg text-left ${
                      answers[index] === q.correctAnswer
                        ? 'bg-green-100 dark:bg-green-900/30 border border-green-500'
                        : 'bg-red-100 dark:bg-red-900/30 border border-red-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {answers[index] === q.correctAnswer ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold mb-2">{q.question}</p>
                        <p className="text-sm">
                          Correct answer: {q.options[q.correctAnswer]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="gradient" className="mt-8" onClick={() => window.location.reload()}>
                Retake Quiz
              </Button>
            </GlassCard>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <Navbar onMenuClick={() => setSidebarOpen(true)} showMenu />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6 md:p-8 max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Technical Quiz</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            
            <GlassCard className="px-6 py-3">
              <div className="flex items-center gap-2">
                <Clock className={`w-5 h-5 ${getTimeColor()}`} />
                <span className={`text-2xl font-bold ${getTimeColor()}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </GlassCard>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <GlassCard className="p-8 mb-6">
            <h2 className="text-2xl font-bold mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedAnswer === index
                      ? showResult
                        ? index === questions[currentQuestion].correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : showResult && index === questions[currentQuestion].correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedAnswer === index && !showResult
                        ? 'bg-white/20'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      <span className={selectedAnswer === index && !showResult ? 'text-white' : ''}>
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Score Display */}
          <GlassCard className="p-6 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Current Score</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {calculateScore()}/{currentQuestion + (showResult ? 1 : 0)}
              </span>
            </div>
          </GlassCard>

          {/* Navigation */}
          <div className="flex gap-4">
            {!showResult ? (
              <Button
                variant="gradient"
                className="flex-1"
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                variant="gradient"
                className="flex-1"
                onClick={handleNext}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
