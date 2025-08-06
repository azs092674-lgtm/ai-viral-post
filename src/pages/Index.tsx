import { useState } from "react";
import { VideoUpload } from "@/components/VideoUpload";
import { TopicInput } from "@/components/TopicInput";
import { AIGeneratedContent } from "@/components/AIGeneratedContent";
import { ViralTimes } from "@/components/ViralTimes";
import { SocialMediaShare } from "@/components/SocialMediaShare";
import { Sparkles, Zap } from "lucide-react";

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [topic, setTopic] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIContent, setShowAIContent] = useState(false);

  const generateAIContent = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('AI content generation failed');
      }

      const data = await response.json();
      setHashtags(data.hashtags);
      setDescription(data.description);
      setShowAIContent(true);
    } catch (error) {
      console.error('Error generating content:', error);
      // Fallback to mock data
      const generatedHashtags = [
        "#viral", "#keşfet", "#trend", "#video", "#content",
        "#socialMedia", "#instagram", "#tiktok", "#youtube", "#share",
        "#ai", "#yapayZeka", "#oto", "#içerik", "#popüler"
      ];
      
      const generatedDescription = `🎬 ${topic}

Bu harika videoyu sizler için hazırladık! Beğenmeyi ve paylaşmayı unutmayın! 

✨ Daha fazla içerik için takip etmeyi unutmayın
💫 Yorumlarda düşüncelerinizi paylaşın
🚀 Arkadaşlarınızla paylaşarak onları da eğlendirin

#keşfet #viral #trend #video #content`;

      setHashtags(generatedHashtags);
      setDescription(generatedDescription);
      setShowAIContent(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateContent = () => {
    generateAIContent();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-white animate-pulse-glow" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              AI Viral Post
            </h1>
            <Sparkles className="w-8 h-8 text-white animate-float" />
          </div>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Videolarınızı yükleyin, AI ile viral içerik oluşturun ve tüm platformlarda aynı anda paylaşın!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <VideoUpload 
              onVideoSelect={setSelectedVideo}
              selectedVideo={selectedVideo}
            />
            
            <TopicInput
              topic={topic}
              onTopicChange={setTopic}
              onGenerateContent={generateAIContent}
              isGenerating={isGenerating}
            />
            
            {showAIContent && (
              <AIGeneratedContent
                hashtags={hashtags}
                description={description}
                onRegenerate={regenerateContent}
                isVisible={showAIContent}
              />
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <ViralTimes />
            
            <SocialMediaShare
              hashtags={hashtags}
              description={description}
              videoFile={selectedVideo}
              isVisible={showAIContent}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">
            AI destekli viral video paylaşım platformu ✨
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;