import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { ScoreSlider } from '../components/ScoreSlider';
import { FileText, Users, ExternalLink } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  members: string[];
  project: string;
  description: string;
  pptUrl: string;
  status: 'pending' | 'evaluated';
}

export function JudgeEvaluate() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [scores, setScores] = useState({
    innovation: 0,
    ui: 0,
    impact: 0,
    technical: 0,
  });
  const [comments, setComments] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const teams: Team[] = [
    {
      id: '1',
      name: 'Code Ninjas',
      members: ['Alice Johnson', 'Bob Smith', 'Carol Davis'],
      project: 'AI Assistant for Developers',
      description: 'An intelligent coding assistant that helps developers write better code faster using advanced AI.',
      pptUrl: '#',
      status: 'pending',
    },
    {
      id: '2',
      name: 'Tech Titans',
      members: ['David Lee', 'Emma Wilson', 'Frank Zhang'],
      project: 'Smart Home Hub',
      description: 'A unified platform to control all your smart home devices with AI-powered automation.',
      pptUrl: '#',
      status: 'pending',
    },
    {
      id: '3',
      name: 'Data Wizards',
      members: ['Grace Kim', 'Henry Chen', 'Iris Martinez'],
      project: 'ML Dashboard',
      description: 'Interactive dashboard for machine learning model monitoring and visualization.',
      pptUrl: '#',
      status: 'evaluated',
    },
  ];

  const handleSubmit = () => {
    if (!selectedTeam) return;
    
    const totalScore = (scores.innovation + scores.ui + scores.impact + scores.technical) / 4;
    alert(`Evaluation submitted for ${selectedTeam.name}!\nAverage Score: ${totalScore.toFixed(1)}/10`);
    
    // Reset form
    setScores({ innovation: 0, ui: 0, impact: 0, technical: 0 });
    setComments('');
    setSuggestion('');
    setSelectedTeam(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <Navbar onMenuClick={() => setSidebarOpen(true)} showMenu />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Evaluate Teams</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Review projects and provide detailed feedback
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Teams List */}
            <div className="lg:col-span-1">
              <GlassCard className="p-6">
                <h2 className="text-xl font-bold mb-4">Teams</h2>
                <div className="space-y-3">
                  {teams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => setSelectedTeam(team)}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        selectedTeam?.id === team.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80'
                      }`}
                    >
                      <div className="font-semibold mb-1">{team.name}</div>
                      <div className={`text-sm ${selectedTeam?.id === team.id ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                        {team.members.length} members
                      </div>
                      {team.status === 'evaluated' && (
                        <div className="mt-2 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
                          ✓ Evaluated
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Evaluation Form */}
            <div className="lg:col-span-2">
              {selectedTeam ? (
                <div className="space-y-6">
                  {/* Project Details */}
                  <GlassCard className="p-6">
                    <h2 className="text-2xl font-bold mb-4">{selectedTeam.project}</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <Users className="w-4 h-4" />
                          Team Members
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedTeam.members.map((member, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-sm"
                            >
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <FileText className="w-4 h-4" />
                          Description
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{selectedTeam.description}</p>
                      </div>

                      <Button variant="secondary" className="w-full sm:w-auto">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Presentation
                      </Button>
                    </div>
                  </GlassCard>

                  {/* Scoring */}
                  <GlassCard className="p-6">
                    <h3 className="text-xl font-bold mb-6">Score Evaluation</h3>
                    <div className="space-y-6">
                      <ScoreSlider
                        label="Innovation"
                        value={scores.innovation}
                        onChange={(value) => setScores({ ...scores, innovation: value })}
                      />
                      <ScoreSlider
                        label="UI/UX Design"
                        value={scores.ui}
                        onChange={(value) => setScores({ ...scores, ui: value })}
                      />
                      <ScoreSlider
                        label="Impact"
                        value={scores.impact}
                        onChange={(value) => setScores({ ...scores, impact: value })}
                      />
                      <ScoreSlider
                        label="Technical Implementation"
                        value={scores.technical}
                        onChange={(value) => setScores({ ...scores, technical: value })}
                      />

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total Average</span>
                          <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {((scores.innovation + scores.ui + scores.impact + scores.technical) / 4).toFixed(1)}/10
                          </span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Feedback */}
                  <GlassCard className="p-6">
                    <h3 className="text-xl font-bold mb-4">Feedback</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-medium mb-2">Comments</label>
                        <textarea
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          className="w-full h-24 px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          placeholder="Provide detailed comments about the project..."
                        />
                      </div>

                      <div>
                        <label className="block font-medium mb-2">Suggestions</label>
                        <textarea
                          value={suggestion}
                          onChange={(e) => setSuggestion(e.target.value)}
                          className="w-full h-24 px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                          placeholder="Suggestions for improvement..."
                        />
                      </div>

                      <Button variant="gradient" className="w-full" onClick={handleSubmit}>
                        Submit Evaluation
                      </Button>
                    </div>
                  </GlassCard>
                </div>
              ) : (
                <GlassCard className="p-12 text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Select a Team</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose a team from the list to start evaluation
                  </p>
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
