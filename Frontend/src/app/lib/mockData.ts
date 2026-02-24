// Mock data for demonstration purposes
// In production, this would be fetched from a backend API

export const mockTeams = [
  {
    id: '1',
    name: 'Code Ninjas',
    members: ['Alice Johnson', 'Bob Smith', 'Carol Davis'],
    project: 'AI Assistant for Developers',
    description: 'An intelligent coding assistant that helps developers write better code faster using advanced AI.',
    pptUrl: '#',
    githubUrl: 'https://github.com/example/ai-assistant',
    demoUrl: 'https://demo.example.com',
    score: 8.5,
    status: 'submitted',
  },
  {
    id: '2',
    name: 'Tech Titans',
    members: ['David Lee', 'Emma Wilson', 'Frank Zhang'],
    project: 'Smart Home Hub',
    description: 'A unified platform to control all your smart home devices with AI-powered automation.',
    pptUrl: '#',
    githubUrl: 'https://github.com/example/smart-home',
    demoUrl: 'https://demo.example.com',
    score: 7.9,
    status: 'submitted',
  },
  {
    id: '3',
    name: 'Data Wizards',
    members: ['Grace Kim', 'Henry Chen', 'Iris Martinez'],
    project: 'ML Dashboard',
    description: 'Interactive dashboard for machine learning model monitoring and visualization.',
    pptUrl: '#',
    githubUrl: 'https://github.com/example/ml-dashboard',
    demoUrl: 'https://demo.example.com',
    score: 9.1,
    status: 'evaluated',
  },
];

export const mockQuestions = [
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
];

export const mockLeaderboard = [
  { rank: 1, teamId: '3', change: 2 },
  { rank: 2, teamId: '1', change: -1 },
  { rank: 3, teamId: '2', change: 1 },
];

export const mockJudgeFeedback = [
  {
    teamId: '1',
    judge: 'Dr. Sarah Johnson',
    scores: {
      innovation: 9,
      ui: 8,
      impact: 8,
      technical: 9,
    },
    comments: 'Excellent implementation of AI features. The code quality is outstanding.',
    suggestions: 'Consider adding more error handling for edge cases.',
    timestamp: '2026-03-15T15:30:00Z',
  },
];
