import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { GlassCard } from "../components/GlassCard";
import { useNavigate } from "react-router";
import {
  Users,
  Upload,
  CheckCircle2,
  Clock,
  MessageSquare,
  Plus,
} from "lucide-react";
import { Button } from "../components/Button";

/* ================= API ================= */

const API = "http://localhost:5000/api/team";

const getToken = () => localStorage.getItem("token");

const getMyTeams = async () => {
  const res = await fetch(`${API}/my`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

const createTeam = async (name: string, description: string) => {
  const res = await fetch(`${API}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, description }),
  });

  return res.json();
};


/* ================= TIME HELPERS ================= */

const DEADLINE = new Date("2026-02-26T14:30:00");

const getRemainingTime = () => {
  const now = new Date().getTime();
  const distance = DEADLINE.getTime() - now;

  if (distance <= 0) return "Closed";

  const hours = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};


/* ================= COMPONENT ================= */

export function TeamDashboard() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/team/project"); // React Router path
  };
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft(getRemainingTime());
  }, 1000);

  return () => clearInterval(interval);
}, []);

  /* ===== FETCH TEAMS ===== */
const fetchTeams = async () => {
      try {
        const data = await getMyTeams();
        setTeams(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    

    fetchTeams();
  }, []);

  const teamInfo = teams[0];


  const [showInvite, setShowInvite] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const addMember = async (teamId: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "http://localhost:5000/api/team/add-member",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        teamId,
        email: memberEmail,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) alert(data.msg);
  else {
    alert("Member Added ✅");
    fetchTeams();
    setMemberEmail("");
  }
};

  /* ===== CREATE TEAM ===== */

  const handleCreateTeam = async () => {
    if (!teamName) return alert("Enter team name");

    const newTeam = await createTeam(teamName, teamDesc);

    setTeams([newTeam]);
    setShowCreate(false);
    setTeamName("");
    setTeamDesc("");
  };

  /* ===== LOADING ===== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Teams...
      </div>
    );
  }

  /* =====================================================
        NO TEAM SCREEN (🔥 IMPROVED UI)
  ===================================================== */

  if (!teamInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <h1 className="text-4xl font-bold">No Team Created Yet</h1>

        {user.role === "team-lead" && (
          <Button
            variant="gradient"
            onClick={() => setShowCreate(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Team
          </Button>
        )}

        {/* ===== CREATE TEAM MODAL ===== */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <GlassCard className="p-8 w-[420px] space-y-5 animate-scaleIn">
              <h2 className="text-2xl font-bold text-center">
                Create Your Team 🚀
              </h2>

              <input
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />

              <textarea
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Team Description"
                rows={4}
                value={teamDesc}
                onChange={(e) => setTeamDesc(e.target.value)}
              />

              <div className="flex gap-3 pt-2">
                <Button
                  variant="gradient"
                  className="w-full"
                  onClick={handleCreateTeam}
                >
                  Create Team
                </Button>

                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </Button>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    );
  }

  /* ================= STATS ================= */

  const stats = [
    {
      label: "Team Members",
      value: teamInfo.members?.length || 0,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Submission Status",
      value: "Draft",
      icon: Upload,
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Time Remaining",
      value: timeLeft,
      icon: Clock,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Feedback",
      value: "Pending",
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
    },
  ];

  

  /* ================= DASHBOARD ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <Navbar onMenuClick={() => setSidebarOpen(true)} showMenu />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 pt-16">
        <div className="p-6 md:p-8">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold">{teamInfo.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {teamInfo.description}
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <GlassCard key={index} className="p-6" hover>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="text-white" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* MEMBERS */}
          {/* ================= TEAM MEMBERS ================= */}
<GlassCard className="p-6">
  <h2 className="text-2xl font-bold mb-6">
    Team Members
  </h2>

  <div className="space-y-3">
    {teamInfo.members?.map((member: any, index: number) => (
      <div
        key={index}
        className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-gray-800/50"
      >
        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
            {member.user?.name?.charAt(0).toUpperCase()}
          </div>

          {/* Name & Email */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {member.user?.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {member.user?.email}
            </span>
          </div>
        </div>

        {/* Role / Position */}
        <span className="text-xs bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded font-medium">
          {member.role === "lead" ? "Team Lead" : "Member"}
        </span>
      </div>
    ))}
  </div>

  {/* Invite Button */}
  <Button
    variant="secondary"
    className="w-full mt-4 flex items-center justify-center space-x-2"
    onClick={() => setShowInvite(true)}
  >
    <Users className="w-4 h-4" />
    <span>Invite Member</span>
  </Button>
</GlassCard>
{showInvite && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    
    <GlassCard className="w-[420px] p-6 animate-scaleIn">
      
      <h2 className="text-2xl font-bold mb-2">
        Invite Team Member
      </h2>

      <p className="text-sm text-gray-500 mb-5">
        Enter the registered email address to add a member
      </p>

      <input
        type="email"
        placeholder="member@email.com"
        value={memberEmail}
        onChange={(e) => setMemberEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border bg-white/60 dark:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />

      <div className="flex gap-3 mt-6">
        <Button
          variant="gradient"
          className="w-full"
          onClick={() => {
            addMember(teamInfo._id);
            setShowInvite(false);
            setMemberEmail("");
          }}
        >
          Send Invite
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setShowInvite(false)}
        >
          Cancel
        </Button>
      </div>
    </GlassCard>
  </div>
)}
       

          {/* ================= UPLOAD SECTION ================= */}

<div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 p-6">
<GlassCard className="p-6 mt-6 w-md">
  <h2 className="text-2xl font-bold mb-4">
    Project Submission
  </h2>
  <Button variant="gradient" onClick={handleNavigate} className="flex items-center justify-center space-x-2">
    <Upload className="w-4 h-4 mr-2" />
    Upload Submission
  </Button>
</GlassCard>


{/* ================= FEEDBACK SECTION ================= */}

<GlassCard className="p-6 mt-6 w-4xl">
  <h2 className="text-2xl font-bold mb-6">
    Feedback & Review
  </h2>

  {/* Example feedback */}
  <div className="space-y-4">

    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
      <p className="font-semibold">Judge Feedback</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Good progress. Improve UI responsiveness and add validation.
      </p>
    </div>

    <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
      <p className="font-semibold">Status</p>
      <p className="text-sm">
        Awaiting final submission review.
      </p>
    </div>

  </div>
</GlassCard>
</div>
        </div>
      </main>
    </div>
  );
}