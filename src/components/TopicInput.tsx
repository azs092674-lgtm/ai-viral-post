import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2 } from "lucide-react";

interface TopicInputProps {
  topic: string;
  onTopicChange: (topic: string) => void;
  onGenerateContent: () => void;
  isGenerating: boolean;
}

export const TopicInput = ({ topic, onTopicChange, onGenerateContent, isGenerating }: TopicInputProps) => {
  return (
    <Card className="p-6 bg-card border-border shadow-card">
      <div className="space-y-4">
        <Label htmlFor="topic" className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Video Konusu
        </Label>
        
        <Textarea
          id="topic"
          placeholder="Videonuzun konusunu detaylı bir şekilde açıklayın... Örnek: 'Evde kolay pasta tarifi, 15 dakikada hazır olan çikolatalı kek yapımı'"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          className="min-h-[120px] resize-none border-border focus:ring-primary"
        />
        
        <Button
          onClick={onGenerateContent}
          disabled={!topic.trim() || isGenerating}
          className="w-full bg-gradient-primary border-0 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Wand2 className="w-4 h-4 mr-2 animate-spin" />
              AI İçerik Üretiliyor...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              AI ile Hashtag ve Açıklama Üret
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};