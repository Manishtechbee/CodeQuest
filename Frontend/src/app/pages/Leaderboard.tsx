import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { GlassCard } from '../components/GlassCard';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface Team {
  rank: number;
  name: string;
  project: string;
  score: number;
  members: number;
  change: number;
}

export function Leaderboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const teams: Team[] = [
    { rank: 1, name: 'Data Wizards', project: 'ML Dashboard', score: 9.1, members: 3, change: 2 },
    { rank: 2, name: 'Code Ninjas', project: 'AI Assistant', score: 8.5, members: 3, change: -1 },
    { rank: 3, name: 'Innovation Labs', project: 'Blockchain Voting', score: 8.2, members: 4, change: 1 },
    { rank: 4, name: 'Tech Titans', project: 'Smart Home Hub', score: 7.9, members: 3, change: 0 },
    { rank: 5, name: 'Dev Squad', project: 'Social Platform', score: 7.6, members: 4, change: -2 },
    { rank: 6, name: 'Byte Builders', project: 'E-Learning App', score: 7.3, members: 3, change: 1 },
    { rank: 7, name: 'Cloud Crafters', project: 'Cloud Monitor', score: 7.1, members: 4, change: 0 },
    { rank: 8, name: 'Algorithm Aces', project: 'Code Optimizer', score: 6.9, members: 3, change: 1 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Award className="w-8 h-8 text-amber-600" />;
      default:
        return <span className="text-2xl font-bold text-gray-400">{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-orange-500';
      case 2:
        return 'from-gray-300 to-gray-400';
      case 3:
        return 'from-amber-600 to-amber-700';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <Navbar onMenuClick={() => setSidebarOpen(true)} showMenu />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Live rankings based on judge evaluations
            </p>
          </div>

          {/* Top 3 Podium */}
          <div className="mb-12">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="md:order-1 order-2"
              >
                <GlassCard className="p-6 text-center" hover>
                  <div className="mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 mx-auto mb-3 flex items-center justify-center">
                      <Medal className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-6xl font-bold text-gray-400 mb-2">2</div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{teams[1].name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{teams[1].project}</p>
                  <div className="text-3xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                    {teams[1].score}
                  </div>
                </GlassCard>
              </motion.div>

              {/* 1st Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
                className="md:order-2 order-1"
              >
                <GlassCard className="p-6 text-center md:scale-110 md:shadow-2xl" hover>
                  <div className="mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mx-auto mb-3 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-7xl font-bold text-yellow-500 mb-2">1</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{teams[0].name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{teams[0].project}</p>
                  <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    {teams[0].score}
                  </div>
                </GlassCard>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="md:order-3 order-3"
              >
                <GlassCard className="p-6 text-center" hover>
                  <div className="mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 mx-auto mb-3 flex items-center justify-center">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-6xl font-bold text-amber-600 mb-2">3</div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{teams[2].name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{teams[2].project}</p>
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                    {teams[2].score}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>

          {/* Full Rankings */}
          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold mb-6">All Teams</h2>
            <div className="space-y-3">
              {teams.map((team, index) => (
                <motion.div
                  key={team.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                    team.rank <= 3
                      ? 'bg-gradient-to-r ' + getRankColor(team.rank) + ' text-white'
                      : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80'
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    {getRankIcon(team.rank)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate">{team.name}</h3>
                    <p className={`text-sm truncate ${team.rank <= 3 ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                      {team.project}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <div className={`text-xs ${team.rank <= 3 ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                        Members
                      </div>
                      <div className="font-semibold">{team.members}</div>
                    </div>

                    <div className="text-right">
                      <div className={`text-xs ${team.rank <= 3 ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                        Score
                      </div>
                      <div className="text-2xl font-bold">{team.score}</div>
                    </div>

                    <div className="w-8 flex justify-center">
                      {team.change > 0 ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : team.change < 0 ? (
                        <TrendingUp className="w-5 h-5 text-red-500 rotate-180" />
                      ) : (
                        <div className="w-5 h-0.5 bg-gray-400" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
