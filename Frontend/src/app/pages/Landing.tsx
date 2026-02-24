import { Calendar, Trophy, Users, Clock, ArrowRight, Zap, Code, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';
import { motion } from 'motion/react';

export function Landing() {
  const navigate = useNavigate();

  const prizes = [
    { place: '1st', amount: '2,500', color: 'from-yellow-400 to-orange-500' },
    { place: '2nd', amount: '1,500', color: 'from-gray-300 to-gray-400' },
    { place: '3rd', amount: '800', color: 'from-amber-600 to-amber-700' },
  ];

  const timeline = [
    { time: '09:00 AM', event: 'Registration & Opening Ceremony', icon: Users },
    { time: '10:00 AM', event: 'Hackathon Begins', icon: Code },
    { time: '02:00 PM', event: 'Lunch Break', icon: Clock },
    { time: '02:30 PM', event: 'Project Submission Deadline', icon: Zap },
    { time: '02:45 PM', event: 'Presentations & Judging', icon: Trophy },
    { time: '04:00 PM', event: 'Winners Announcement', icon: Sparkles },
  ];

  const stats = [
    { label: 'Teams Registered', value: '100+' },
    { label: 'Total Prize Pool', value: '5K' },
    { label: 'Hours to Hack', value: '7' },
    { label: 'Expert Judges', value: '5' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                February 26, 2026
              </span>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              CodeQuest 2026
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Join 500+ innovators for 24 hours of coding, creativity, and collaboration.
            Build the future, win amazing prizes.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate('/auth')}
              className="group"
            >
              Register Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform inline" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/auth')}
            >
              Login
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <GlassCard className="p-6 text-center" hover>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Event Timeline</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Two days of innovation and excitement
          </p>
          
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <GlassCard key={index} className="p-6" hover>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{item.event}</div>
                    <div className="text-gray-600 dark:text-gray-400">{item.time}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Pool Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Prize Pool</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Compete for incredible rewards
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {prizes.map((prize, index) => (
              <GlassCard 
                key={index} 
                className={`p-8 text-center ${index === 0 ? 'md:scale-110 md:shadow-2xl' : ''}`}
                hover
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${prize.color} mx-auto mb-4 flex items-center justify-center`}>
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <div className="text-2xl font-bold mb-2">{prize.place} Place</div>
                <div className={`text-4xl font-bold bg-gradient-to-r ${prize.color} bg-clip-text text-transparent`}>
                  {prize.amount}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join us for an unforgettable hackathon experience
            </p>
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate('/auth')}
              className="group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform inline" />
            </Button>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>© 2026 CodeQuest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}