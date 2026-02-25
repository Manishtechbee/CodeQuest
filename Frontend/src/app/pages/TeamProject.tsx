import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { GlassCard } from "../components/GlassCard";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Upload, FileText, Save } from "lucide-react";

type StatusType = {
  info: boolean;
  presentation: boolean;
};

type Project = {
  title: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  presentation?: string;
};

type TeamProjectProps = {
  teamId: string;
};

export function TeamProject({ teamId }: TeamProjectProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Project fields
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");

  // File uploads
  const [presentationFile, setPresentationFile] = useState<File | null>(null);

  const [status, setStatus] = useState<StatusType>({
    info: false,
    presentation: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Load existing project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/projects/team/${teamId}`,
          config
        );
        const project: Project = res.data;
        setProjectTitle(project.title);
        setDescription(project.description);
        setGithubUrl(project.githubUrl);
        setDemoUrl(project.demoUrl);
        setStatus((prev) => ({
          ...prev,
          info: true,
          presentation: !!project.presentation,
        }));
      } catch (err: any) {
        console.error(err);
        setMessage("Failed to load project data");
      }
    };

    fetchProject();
  }, [teamId]);

  // Save project info to DB
  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/projects`,
        {
          teamId,
          title: projectTitle,
          description,
          githubUrl,
          demoUrl,
        },
        config
      );
      setStatus((prev) => ({ ...prev, info: true }));
      setMessage("Project details saved successfully!");
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Failed to save project details");
    } finally {
      setLoading(false);
    }
  };

  // Upload files
  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    type: "presentation" 
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("teamId", teamId);
    formData.append("type", type);

    try {
      await axios.post(
        `http://localhost:5000/api/projects/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setStatus((prev) => ({ ...prev, [type]: true }));

      if (type === "presentation") setPresentationFile(file);
      
      setMessage(`${type} uploaded successfully!`);
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.msg || `Failed to upload ${type}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <Navbar onMenuClick={() => setSidebarOpen(true)} showMenu />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:ml-64 pt-16">
        <div className="p-6 md:p-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Project Details</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your project information and submissions
            </p>
          </div>

          <div className="space-y-6">
            {/* Project Information */}
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold mb-6">Project Information</h2>
              <div className="space-y-4">
                <Input
                  label="Project Title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Enter your project title"
                />

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-32 px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    placeholder="Describe your project..."
                  />
                </div>

                <Input
                  label="GitHub Repository"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  type="url"
                />

                <Input
                  label="Demo URL"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://your-demo.com"
                  type="url"
                />


{/* File Uploads */}
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold mb-6">File Uploads</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-semibold mb-2">Upload Presentation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    PPT, PDF, or Google Slides link (Max 50MB)
                  </p>
                  <input
                    type="file"
                    accept=".ppt,.pptx,.pdf"
                    onChange={(e) => handleFileUpload(e, "presentation")}
                    className="hidden"
                    id="presentation-file"
                  />
                  <label htmlFor="presentation-file">
                    <Button variant="secondary">Choose File</Button>
                  </label>
                </div>

                
              </div>
            </GlassCard>
                <Button variant="gradient" onClick={handleSave} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </GlassCard>

            

           
          </div>
        </div>
      </main>
    </div>
  );
}