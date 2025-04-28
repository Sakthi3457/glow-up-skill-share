
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

interface MeetingPreferenceProps {
  onPreferenceChange: (data: {
    type: "online" | "in-person";
    platform?: string;
    location?: string;
  }) => void;
}

const MeetingPreference = ({ onPreferenceChange }: MeetingPreferenceProps) => {
  const [meetingType, setMeetingType] = useState<"online" | "in-person">("online");
  const [platform, setPlatform] = useState("");
  const [location, setLocation] = useState("");

  const handleTypeChange = (value: "online" | "in-person") => {
    setMeetingType(value);
    onPreferenceChange({
      type: value,
      ...(value === "online" ? { platform } : { location }),
    });
  };

  const handleDetailChange = (value: string) => {
    if (meetingType === "online") {
      setPlatform(value);
      onPreferenceChange({ type: meetingType, platform: value });
    } else {
      setLocation(value);
      onPreferenceChange({ type: meetingType, location: value });
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white">
      <div className="space-y-2">
        <Label>How would you like to meet?</Label>
        <Select
          value={meetingType}
          onValueChange={(value: "online" | "in-person") => handleTypeChange(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select meeting type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="online">Online Meeting</SelectItem>
            <SelectItem value="in-person">In Person</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {meetingType === "online" ? (
          <>
            <Label>Preferred Platform</Label>
            <Select value={platform} onValueChange={handleDetailChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zoom">Zoom</SelectItem>
                <SelectItem value="google-meet">Google Meet</SelectItem>
                <SelectItem value="teams">Microsoft Teams</SelectItem>
                <SelectItem value="skype">Skype</SelectItem>
              </SelectContent>
            </Select>
          </>
        ) : (
          <>
            <Label>Meeting Location</Label>
            <div className="relative">
              <Input
                type="text"
                value={location}
                onChange={(e) => handleDetailChange(e.target.value)}
                placeholder="Enter meeting location"
                className="pl-10"
              />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MeetingPreference;
