import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { GlassCard } from '../components/GlassCard';
import { Users, Upload, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { Button } from '../components/Button';

export function TeamDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const teamInfo = {
    name: 'Code Ninjas',
    members: ['Alice Johnson (Lead)', 'Bob Smith', 'Carol Davis'],
    project: 'AI Assistant for Developers',
    status: 'In Progress',
  };

  const stats = [
    {
      label: 'Team Members',
      value: '3',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Submission Status',
      value: 'Draft',
      icon: Upload,
      color: 'from-orange-500 to-red-500',
    },
    {
      label: 'Time Remaining',
      value: '8h 24m',
      icon: Clock,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Feedback',
      value: 'Pending',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const timeline = [
    { time: '10:00 AM', event: 'Team Created', status: 'completed' },
    { time: '10:30 AM', event: 'Project Idea Finalized', status: 'completed' },
    { time: '2:00 PM', event: 'Development Started', status: 'completed' },
    { time: '6:00 PM', event: 'Submit Project', status: 'pending' },
    { time: '7:00 PM', event: 'Presentation', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <Navbar onMenuClick={() => setSidebarOpen(true)} showMenu />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{teamInfo.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {teamInfo.project}
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
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Team Members */}
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold mb-6">Team Members</h2>
              <div className="space-y-3">
                {teamInfo.members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {member.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{member}</div>
                    </div>
                    {index === 0 && (
                      <span className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-xs font-medium">
                        Lead
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <Button variant="secondary" className="w-full mt-4">
                <Users className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </GlassCard>

            {/* Timeline */}
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold mb-6">Timeline</h2>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.status === 'completed'
                        ? 'bg-green-500'
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}>
                      {item.status === 'completed' && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{item.event}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold mb-4">Project Submission</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Upload your project files and presentation before the deadline
              </p>
              <Button variant="gradient" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Project
              </Button>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-xl font-bold mb-4">Judge Feedback</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                View feedback and suggestions from judges after evaluation
              </p>
              <Button variant="secondary" className="w-full" disabled>
                <MessageSquare className="w-4 h-4 mr-2" />
                View Feedback (Pending)
              </Button>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}
