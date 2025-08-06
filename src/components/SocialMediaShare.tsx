import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Youtube, Instagram } from "lucide-react";
import { toast } from "sonner";

interface SocialMediaShareProps {
  hashtags: string[];
  description: string;
  videoFile: File | null;
  isVisible: boolean;
}

export const SocialMediaShare = ({ hashtags, description, videoFile, isVisible }: SocialMediaShareProps) => {
  const handleShare = async (platform: string) => {
    if (!videoFile) {
      toast.error("Önce bir video yükleyin!");
      return;
    }

    if (!description || hashtags.length === 0) {
      toast.error("Önce AI ile içerik oluşturun!");
      return;
    }

    // Simulate sharing process
    toast.loading(`${platform} paylaşımı hazırlanıyor...`);
    
    setTimeout(() => {
      toast.success(`${platform} için paylaşım hazır! (Demo modunda)`);
    }, 2000);
  };

  const handleShareAll = async () => {
    if (!videoFile || !description || hashtags.length === 0) {
      toast.error("Önce video yükleyin ve AI içeriği oluşturun!");
      return;
    }

    toast.loading("Tüm platformlara paylaşım hazırlanıyor...");
    
    setTimeout(() => {
      toast.success("Tüm platformlara paylaşım hazır! (Demo modunda)");
    }, 3000);
  };

  const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  );

  if (!isVisible) return null;

  return (
    <Card className="p-6 bg-card border-border shadow-card">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Share2 className="w-5 h-5 text-primary" />
          Sosyal Medya Paylaşımı
        </h3>

        {/* Individual Platform Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => handleShare("YouTube")}
            className="bg-red-600 hover:bg-red-700 text-white border-0 h-12"
          >
            <Youtube className="w-5 h-5 mr-2" />
            YouTube
          </Button>
          
          <Button
            onClick={() => handleShare("TikTok")}
            className="bg-black hover:bg-gray-900 text-white border-0 h-12"
          >
            <TikTokIcon />
            <span className="ml-2">TikTok</span>
          </Button>
          
          <Button
            onClick={() => handleShare("Instagram")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 h-12"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Instagram
          </Button>
        </div>

        {/* Share All Button */}
        <Button
          onClick={handleShareAll}
          className="w-full bg-gradient-primary border-0 hover:scale-105 transition-all h-14 text-lg font-semibold shadow-glow"
        >
          <Share2 className="w-6 h-6 mr-3" />
          Tüm Platformlara Aynı Anda Paylaş
        </Button>

        {/* Info */}
        <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
          <p className="text-accent text-sm">
            💡 <strong>Pro İpucu:</strong> En yüksek etkileşim için video konunuza uygun viral saatlerde paylaşın!
          </p>
        </div>
      </div>
    </Card>
  );
};