import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { UserCircle, Users, Shield } from 'lucide-react';

type UserRole = 'judge' | 'team-lead' | 'team-member';

export function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: 'judge' as UserRole,
      title: 'Judge',
      description: 'Evaluate projects and provide scores',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'team-lead' as UserRole,
      title: 'Team Lead',
      description: 'Manage your team and submissions',
      icon: UserCircle,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'team-member' as UserRole,
      title: 'Team Member',
      description: 'Collaborate with your team',
      icon: Users,
      color: 'from-orange-500 to-red-500',
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setLoading(true);
    try {
      await login(email, password, selectedRole);
      
      // Navigate based on role
      if (selectedRole === 'judge') {
        navigate('/judge');
      } else {
        navigate('/team');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Select your role to continue
            </p>
          </div>

          {!selectedRole ? (
            <div className="grid md:grid-cols-3 gap-6">
              {roles.map((role) => (
                <GlassCard
                  key={role.id}
                  className="p-8 cursor-pointer group"
                  hover
                  onClick={() => {
  console.log("Role selected:", role.id);
  setSelectedRole(role.id);
}}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{role.description}</p>
                </GlassCard>
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <GlassCard className="p-8">
                <div className="mb-6">
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    ← Change role
                  </button>
                </div>

                <div className="text-center mb-8">
                  {(() => {
                    const role = roles.find((r) => r.id === selectedRole);
                    return role ? (
                      <>
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mx-auto mb-4`}>
                          <role.icon className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Login as {role.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{role.description}</p>
                      </>
                    ) : null;
                  })()}
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <Input
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>

                  <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      Register here
                    </button>
                  </div>
                </form>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
