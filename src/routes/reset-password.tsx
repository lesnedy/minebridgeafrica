import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "Reset Password — MineBridge Africa" },
    { name: "description", content: "Set a new password for your MineBridge Africa admin account." },
    { property: "og:title", content: "Reset Password — MineBridge Africa" },
    { property: "og:description", content: "Set a new password for your MineBridge Africa account." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: ResetPage,
});

function ResetPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [valid, setValid] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  useEffect(() => {
    setValid(window.location.hash.includes("type=recovery"));
    const { data } = supabase.auth.onAuthStateChange(e => { if (e === "PASSWORD_RECOVERY") setValid(true); });
    return () => data.subscription.unsubscribe();
  }, []);
  async function submit(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { toast.error(error.message); return; }
    toast.success(t.admin.saved); void navigate({ to: "/admin" });
  }
  return (
    <div className="container-site flex justify-center py-16">
      <div className="w-full max-w-md rounded-xl border bg-card p-8">
        <h1 className="text-2xl font-bold text-navy">{t.admin.reset}</h1>
        {valid === false ? <p className="mt-4 text-muted-foreground">{t.admin.resetInvalid}</p> :
          <form onSubmit={submit} className="mt-6 grid gap-4">
            <div className="grid gap-2"><Label htmlFor="np">{t.admin.newPassword}</Label><Input id="np" type="password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} /></div>
            <Button type="submit" variant="gold">{t.admin.reset}</Button>
          </form>}
      </div>
    </div>
  );
}
