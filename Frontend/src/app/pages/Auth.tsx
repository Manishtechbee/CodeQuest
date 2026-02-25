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


  const [isRegister, setIsRegister] = useState(false);
const [name, setName] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedRole) return;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role: selectedRole,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.msg);

    // optional auto login
    await login(email, password, selectedRole);

    if (selectedRole === "judge") {
      navigate("/judge");
    } else {
      navigate("/team");
    }
  } catch (err) {
    console.error("Register failed:", err);
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
                <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
                  {isRegister && (
  <Input
    type="text"
    label="Full Name"
    placeholder="Your name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
)}
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
                  {isRegister && (
  <Input
    type="password"
    label="Confirm Password"
    placeholder="••••••••"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
)}

                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading
  ? isRegister
    ? "Creating Account..."
    : "Logging in..."
  : isRegister
  ? "Register"
  : "Login"}
                  </Button>

                  <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    {isRegister ? (
    <>
      Already have an account?{" "}
      <button
        type="button"
        className="text-purple-600 hover:underline"
        onClick={() => setIsRegister(false)}
      >
        Login here
      </button>
    </>
  ) : (
    <>
      Don't have an account?{" "}
      <button
        type="button"
        className="text-purple-600 hover:underline"
        onClick={() => setIsRegister(true)}
      >
        Register here
      </button>
    </>
  )}
  <div className="flex items-center my-4">
  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
  <span className="px-3 text-sm text-gray-500">OR</span>
  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
</div>
                    <Button
  type="button"
  
  className="mt-5 w-full flex items-center justify-center gap-3 
             bg-white hover:bg-gray-50 
             dark:bg-gray-900 dark:hover:bg-gray-200
             border border-gray-300 dark:border-gray-700
             text-gray-700 dark:text-gray-200
             font-medium py-3 transition-all duration-200"
  onClick={() => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  }}
>
  {/* Google Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="w-5 h-5"
  >
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.6l6.9-6.9C35.64 2.36 30.24 0 24 0 14.64 0 6.56 5.4 2.64 13.32l8.04 6.24C12.72 13.02 17.88 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.5 24.5c0-1.64-.14-3.2-.4-4.7H24v9h12.7c-.54 2.9-2.18 5.36-4.64 7l7.2 5.6c4.2-3.86 6.64-9.56 6.64-16.9z"/>
    <path fill="#FBBC05" d="M10.68 28.56A14.5 14.5 0 019.5 24c0-1.58.28-3.1.78-4.56l-8.04-6.24A23.9 23.9 0 000 24c0 3.86.92 7.5 2.56 10.68l8.12-6.12z"/>
    <path fill="#34A853" d="M24 48c6.24 0 11.48-2.06 15.3-5.6l-7.2-5.6c-2 1.34-4.56 2.14-8.1 2.14-6.12 0-11.28-3.52-13.32-8.56l-8.12 6.12C6.56 42.6 14.64 48 24 48z"/>
  </svg>

  Continue with Google
</Button>
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
