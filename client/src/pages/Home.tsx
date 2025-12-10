import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useConfig } from "@/contexts/ConfigContext";
import { Music, Settings as SettingsIcon, Video } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "wouter";

const LINKS = {
  video: "https://script.google.com/macros/s/AKfycbzbXVKRM7l08wYIkM_eCZc-E_4VRBodasJG1AbAXfdrmzqTU14iEiC2mAxxkHLxKIa1YQ/exec",
  audio: "https://script.google.com/macros/s/AKfycbwewf2daga-M62MyO9fXrzo7My6FiK6cgbI4LS4Eomp9Mm_oF_NQ_eYcTkcBcDPu2S-/exec"
};

export default function Home() {
  const { mainLink } = useConfig();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Auto-redirect if main link is set and we are just landing here
    // We add a small delay to allow user to cancel or see the UI if needed, 
    // but for this requirement "inicializar", immediate redirect is usually expected.
    // However, to allow accessing settings, we might want to only redirect if it's a fresh visit.
    // For now, let's keep it as a manual choice unless configured, but the prompt implies
    // "qual o link será o principal para inicializar".
    
    if (mainLink) {
      window.location.href = LINKS[mainLink];
    }
  }, [mainLink]);

  if (mainLink) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Redirecionando para {mainLink}...</div>
        {/* Fallback button in case redirect is blocked or slow */}
        <Button 
          variant="link" 
          className="text-white/50 mt-4 absolute bottom-10"
          onClick={() => setLocation("/settings")}
        >
          Cancelar e ir para Configurações
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px] -z-10" />

      <div className="z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Video Card */}
        <a href={LINKS.video} className="group">
          <Card className="glass glass-hover h-64 flex flex-col items-center justify-center gap-6 cursor-pointer border-0 bg-white/5 hover:bg-white/10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]">
            <div className="p-6 rounded-full bg-blue-500/20 text-blue-300 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Video className="w-12 h-12" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide group-hover:text-blue-200 transition-colors">
              Vídeo
            </span>
          </Card>
        </a>

        {/* Audio Card */}
        <a href={LINKS.audio} className="group">
          <Card className="glass glass-hover h-64 flex flex-col items-center justify-center gap-6 cursor-pointer border-0 bg-white/5 hover:bg-white/10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]">
            <div className="p-6 rounded-full bg-purple-500/20 text-purple-300 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <Music className="w-12 h-12" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide group-hover:text-purple-200 transition-colors">
              Áudio
            </span>
          </Card>
        </a>
      </div>

      {/* Settings Button */}
      <Link href="/settings">
        <Button 
          variant="ghost" 
          className="mt-12 text-white/60 hover:text-white hover:bg-white/10 gap-2 rounded-full px-6 py-6 glass"
        >
          <SettingsIcon className="w-5 h-5" />
          Configurações
        </Button>
      </Link>
    </div>
  );
}
