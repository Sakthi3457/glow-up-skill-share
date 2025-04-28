
import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { skillsList } from "@/data/mockData";

interface SkillSelectorProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
  label: string;
  placeholder: string;
  type: "teach" | "learn";
  maxSkills?: number;
}

const SkillSelector = ({
  selectedSkills = [],
  onChange,
  label,
  placeholder,
  type,
  maxSkills = 5,
}: SkillSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [availableSkills, setAvailableSkills] = useState<string[]>(skillsList);
  
  useEffect(() => {
    // Filter out already selected skills from the list
    setAvailableSkills(
      skillsList.filter((skill) => !selectedSkills.includes(skill))
    );
  }, [selectedSkills]);

  const addSkill = (skill: string) => {
    if (selectedSkills.length >= maxSkills) {
      return;
    }
    
    const newSkills = [...selectedSkills, skill];
    onChange(newSkills);
    setQuery("");
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = selectedSkills.filter((skill) => skill !== skillToRemove);
    onChange(newSkills);
  };

  const badgeClass = type === "teach" ? "skill-badge-teach" : "skill-badge-learn";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium leading-none">{label}</label>
        <span className="text-xs text-gray-500">
          {selectedSkills.length} / {maxSkills}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {selectedSkills.map((skill) => (
          <div 
            key={skill}
            className={cn("skill-badge", badgeClass, "flex items-center gap-1")}
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="rounded-full p-0 w-4 h-4 inline-flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {skill}</span>
            </button>
          </div>
        ))}
      </div>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-gray-500 font-normal hover:text-gray-900"
            disabled={selectedSkills.length >= maxSkills}
          >
            {selectedSkills.length >= maxSkills ? (
              <span>Maximum skills selected</span>
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[300px]" align="start">
          <Command>
            <CommandInput 
              placeholder={`Search ${type === "teach" ? "teachable" : "learnable"} skills...`}
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>No skills found.</CommandEmpty>
              <CommandGroup>
                {availableSkills
                  .filter((skill) => 
                    skill.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((skill) => (
                    <CommandItem
                      key={skill}
                      value={skill}
                      onSelect={() => {
                        addSkill(skill);
                        setOpen(false);
                      }}
                    >
                      <span>{skill}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedSkills.includes(skill) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SkillSelector;
