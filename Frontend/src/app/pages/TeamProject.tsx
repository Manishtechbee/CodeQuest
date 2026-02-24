import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Upload, FileText, Link as LinkIcon, Save } from 'lucide-react';

export function TeamProject() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState('AI Assistant for Developers');
  const [description, setDescription] = useState('An intelligent coding assistant that helps developers write better code faster using advanced AI models and natural language processing.');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');

  const handleSave = () => {
    alert('Project details saved successfully!');
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
                  <label className="block text-sm font-medium mb-2">Description</label>
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

                <Button variant="gradient" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </GlassCard>

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
                  <Button variant="secondary">
                    Choose File
                  </Button>
                </div>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-semibold mb-2">Upload Documentation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    PDF, MD, or TXT files
                  </p>
                  <Button variant="secondary">
                    Choose File
                  </Button>
                </div>
              </div>
            </GlassCard>

            {/* Submission Status */}
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold mb-6">Submission Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <div>
                    <div className="font-semibold">Project Information</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xl">✓</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <div>
                    <div className="font-semibold">Presentation Upload</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white text-xl">!</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <div>
                    <div className="font-semibold">Documentation</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-white text-xl">!</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-800 dark:text-orange-300">
                  <strong>Reminder:</strong> Please upload all required files before 6:00 PM to complete your submission.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}
