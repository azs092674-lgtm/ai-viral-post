import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Play, X } from "lucide-react";
import { toast } from "sonner";

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
  selectedVideo: File | null;
}

export const VideoUpload = ({ onVideoSelect, selectedVideo }: VideoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        setVideoPreview(url);
        onVideoSelect(file);
        toast.success("Video başarıyla yüklendi!");
      } else {
        toast.error("Lütfen geçerli bir video dosyası seçin");
      }
    }
  };

  const handleRemoveVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    onVideoSelect(null as any);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-6 bg-card border-border shadow-card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Video Yükle</h3>
        
        {!videoPreview ? (
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors group"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
            <p className="text-foreground font-medium mb-2">
              Video dosyanızı buraya sürükleyin veya tıklayarak seçin
            </p>
            <p className="text-muted-foreground text-sm">
              MP4, MOV, AVI desteklenir (Maks. 100MB)
            </p>
          </div>
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              src={videoPreview}
              className="w-full h-48 object-cover rounded-lg"
              controls
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleRemoveVideo}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!videoPreview && (
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-gradient-primary border-0 hover:scale-105 transition-transform"
          >
            <Upload className="w-4 h-4 mr-2" />
            Video Seç
          </Button>
        )}
      </div>
    </Card>
  );
};