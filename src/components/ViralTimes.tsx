import { Card } from "@/components/ui/card";
import { Clock, TrendingUp, Calendar } from "lucide-react";

interface ViralTime {
  time: string;
  platform: string;
  reason: string;
  engagement: string;
}

const viralTimes: ViralTime[] = [
  {
    time: "09:00 - 10:00",
    platform: "Instagram",
    reason: "Sabah kahvesi molası",
    engagement: "+85% etkileşim"
  },
  {
    time: "14:00 - 15:00", 
    platform: "TikTok",
    reason: "Öğle arası gezinti",
    engagement: "+92% etkileşim"
  },
  {
    time: "17:00 - 18:00",
    platform: "YouTube",
    reason: "İş çıkışı saatleri",
    engagement: "+78% etkileşim"
  },
  {
    time: "20:00 - 21:00",
    platform: "Instagram",
    reason: "Akşam dinlenme",
    engagement: "+95% etkileşim"
  },
  {
    time: "22:00 - 23:00",
    platform: "TikTok", 
    reason: "Gece keşfi",
    engagement: "+88% etkileşim"
  }
];

export const ViralTimes = () => {
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return 'from-pink-500 to-orange-400';
      case 'tiktok':
        return 'from-black to-red-500';
      case 'youtube':
        return 'from-red-500 to-red-600';
      default:
        return 'from-primary to-accent';
    }
  };

  return (
    <Card className="p-6 bg-card border-border shadow-card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          Viral Yayın Saatleri
        </h3>
        
        <div className="space-y-3">
          {viralTimes.map((viralTime, index) => (
            <div
              key={index}
              className="bg-secondary/50 rounded-lg p-4 border border-border hover:bg-secondary/70 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-foreground">{viralTime.time}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getPlatformColor(viralTime.platform)}`}>
                    {viralTime.platform}
                  </div>
                </div>
                <span className="text-success font-medium text-sm">{viralTime.engagement}</span>
              </div>
              
              <p className="text-muted-foreground text-sm mt-2 group-hover:text-foreground transition-colors">
                {viralTime.reason}
              </p>
            </div>
          ))}
        </div>
        
        <div className="bg-accent/10 rounded-lg p-3 border border-accent/30">
          <div className="flex items-center gap-2 text-accent">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">
              Bugün için önerilen saat: <strong>20:00 - 21:00</strong>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};