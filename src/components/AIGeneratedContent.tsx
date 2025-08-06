import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Hash, FileText } from "lucide-react";
import { toast } from "sonner";

interface AIGeneratedContentProps {
  hashtags: string[];
  description: string;
  onRegenerate: () => void;
  isVisible: boolean;
}

export const AIGeneratedContent = ({ hashtags, description, onRegenerate, isVisible }: AIGeneratedContentProps) => {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} panoya kopyalandı!`);
  };

  const copyAll = () => {
    const allContent = `${description}\n\n${hashtags.join(' ')}`;
    navigator.clipboard.writeText(allContent);
    toast.success("Tüm içerik panoya kopyalandı!");
  };

  if (!isVisible) return null;

  return (
    <div className="space-y-4">
      {/* Description Card */}
      <Card className="p-6 bg-card border-border shadow-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              AI Açıklama
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(description, "Açıklama")}
              className="border-border hover:bg-secondary"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <p className="text-foreground whitespace-pre-wrap">{description}</p>
          </div>
        </div>
      </Card>

      {/* Hashtags Card */}
      <Card className="p-6 bg-card border-border shadow-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Hash className="w-5 h-5 text-primary" />
              AI Hashtagler
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(hashtags.join(' '), "Hashtagler")}
              className="border-border hover:bg-secondary"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onRegenerate}
          variant="outline"
          className="flex-1 border-border hover:bg-secondary"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Yeniden Üret
        </Button>
        <Button
          onClick={copyAll}
          className="flex-1 bg-gradient-primary border-0 hover:scale-105 transition-transform"
        >
          <Copy className="w-4 h-4 mr-2" />
          Tümünü Kopyala
        </Button>
      </div>
    </div>
  );
};