import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useConfig } from "@/contexts/ConfigContext";
import { ArrowLeft, Music, Video } from "lucide-react";
import { Link } from "wouter";

export default function Settings() {
  const { mainLink, setMainLink } = useConfig();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass border-0">
        <CardHeader>
          <div className="flex items-center gap-4 mb-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Configurações
            </CardTitle>
          </div>
          <CardDescription className="text-white/60">
            Escolha qual aplicativo será iniciado automaticamente como principal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue={mainLink || "none"}
            onValueChange={(value) => setMainLink(value === "none" ? null : (value as "video" | "audio"))}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-2 rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors cursor-pointer">
              <RadioGroupItem value="video" id="video" className="border-white/50 text-white" />
              <Label htmlFor="video" className="flex-1 cursor-pointer flex items-center gap-3 font-medium text-white">
                <div className="p-2 rounded-lg bg-white/10 text-white">
                  <Video className="h-5 w-5" />
                </div>
                Vídeo Principal
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors cursor-pointer">
              <RadioGroupItem value="audio" id="audio" className="border-white/50 text-white" />
              <Label htmlFor="audio" className="flex-1 cursor-pointer flex items-center gap-3 font-medium text-white">
                <div className="p-2 rounded-lg bg-white/10 text-white">
                  <Music className="h-5 w-5" />
                </div>
                Áudio Principal
              </Label>
            </div>

            <div className="flex items-center space-x-2 rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors cursor-pointer">
              <RadioGroupItem value="none" id="none" className="border-white/50 text-white" />
              <Label htmlFor="none" className="flex-1 cursor-pointer font-medium text-white/80">
                Nenhum (Sempre perguntar)
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
