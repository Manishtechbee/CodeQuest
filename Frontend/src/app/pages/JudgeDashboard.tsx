import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { GlassCard } from '../components/GlassCard';
import { Trophy, Users, CheckCircle2, Clock } from 'lucide-react';
import axios from 'axios';

export function JudgeDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  

  const recentEvaluations = [
    { team: 'Code Ninjas', project: 'AI Assistant', score: 8.5, status: 'completed' },
    { team: 'Tech Titans', project: 'Smart Home Hub', score: 7.2, status: 'completed' },
    { team: 'Data Wizards', project: 'ML Dashboard', score: 9.1, status: 'completed' },
    { team: 'Dev Squad', project: 'Social Platform', score: 6.8, status: 'completed' },
  ];

   const [totalTeams, setTotalTeams] = useState<number>(0);
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

 useEffect(() => {
  const fetchCount = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/team/count", // backend port
        config // pass auth headers
      );
      console.log("Teams count response:", res.data);
      setTotalTeams(res.data.totalTeams);
    } catch (err) {
      console.error("Error fetching teams count:", err);
    }
  };

  fetchCount();
}, []);


  const stats = [
    {
      label: 'Total Teams',
      value: totalTeams,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Evaluated',
      value: '32',
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Pending',
      value: '16',
      icon: Clock,
      color: 'from-orange-500 to-red-500',
    },
    {
      label: 'Avg Score',
      value: '7.8',
      icon: Trophy,
      color: 'from-purple-500 to-pink-500',
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <Navbar onMenuClick={() => setSidebarOpen(true)} showMenu />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Judge Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Review and evaluate team submissions
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <GlassCard key={index} className="p-6" hover>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {stat.label}
                    </p>
                    <p className="text-4xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Recent Evaluations */}
          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Evaluations</h2>
            <div className="space-y-4">
              {recentEvaluations.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.team}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.project}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {item.score}/10
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
