import { useState } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';
import { UserPlus, Mail, Copy, Check } from 'lucide-react';

interface TeamInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
}

export function TeamInviteModal({ isOpen, onClose, teamName }: TeamInviteModalProps) {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const inviteLink = `https://hackhub.com/join/team-abc123`;

  const handleInvite = () => {
    // Mock invite logic
    alert(`Invitation sent to ${email}`);
    setEmail('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Team Members">
      <div className="space-y-6">
        {/* Invite by Email */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Invite by Email
          </h3>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="teammate@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="gradient"
              onClick={handleInvite}
              disabled={!email}
            >
              <UserPlus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 my-6" />

        {/* Invite Link */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Share Invite Link
          </h3>
          <div className="flex gap-2">
            <Input
              value={inviteLink}
              readOnly
              className="flex-1"
            />
            <Button
              variant={copied ? 'secondary' : 'gradient'}
              onClick={handleCopyLink}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Anyone with this link can join {teamName}
          </p>
        </div>
      </div>
    </Modal>
  );
}
