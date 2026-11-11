import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useI18n } from "@/lib/i18n";
import { useSiteSession } from "@/components/site/SessionProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import companyLogo from "@/assets/company-logo.asset.json";

/**
 * Shared administrator sign-in card. It is rendered by /auth and again by
 * /admin when no session exists, so the news desk can be entered directly.
 */
export function AuthCard() {
  const { t } = useI18n();
  const { user } = useSiteSession();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up" | "forgot">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  useEffect(() => { if (user) void navigate({ to: "/admin", replace: true }); }, [user, navigate]);

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true);
    setShowResendConfirmation(false);
    try {
      const normalizedEmail = email.trim();

      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
        if (error) {
          if (error.code === "email_not_confirmed" || error.message.toLowerCase().includes("email not confirmed")) {
            setShowResendConfirmation(true);
          }
          throw error;
        }
      } else if (mode === "up") {
        const { error } = await supabase.auth.signUp({ email: normalizedEmail, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
        if (error) throw error;
        toast.success(t.admin.confirm); setMode("in");
      } else {
        await supabase.auth.resetPasswordForEmail(normalizedEmail, { redirectTo: window.location.origin + "/reset-password" });
        toast.success(t.admin.resetSent); setMode("in");
      }
    } catch (err) { toast.error(err instanceof Error ? err.message : t.admin.error); }
    finally { setBusy(false); }
  }
  async function resendConfirmation() {
    setBusy(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      if (error) throw error;
      toast.success(t.admin.confirmResent);
      setShowResendConfirmation(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.admin.error);
    } finally {
      setBusy(false);
    }
  }
  async function google() {
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (res.error) toast.error(t.admin.error);
  }
  const heading = mode === "up" ? t.admin.signUp : mode === "forgot" ? t.admin.reset : t.admin.login;
  return (
    <div className="container-site flex justify-center py-16">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-elegant">
        <div className="mb-5 flex justify-center">
          <img src={companyLogo.url} alt="MineBridge Africa logo" className="h-auto w-48 object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-navy">{heading}</h1>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" /></div>
          {mode !== "forgot" && <div className="grid gap-2"><Label htmlFor="password">{t.admin.password}</Label><Input id="password" type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} autoComplete={mode === "up" ? "new-password" : "current-password"} /></div>}
          <Button type="submit" variant="gold" disabled={busy}>{busy ? t.admin.busy : mode === "forgot" ? t.admin.reset : mode === "up" ? t.admin.signUp : t.admin.signIn}</Button>
        </form>
        {showResendConfirmation && mode === "in" && (
          <div className="mt-4 grid gap-2">
            <p className="text-sm text-muted-foreground">{t.admin.emailNotConfirmed}</p>
            <Button type="button" variant="outline" disabled={busy || !email.trim()} onClick={() => void resendConfirmation()}>
              {t.admin.resendConfirmation}
            </Button>
          </div>
        )}
        {mode !== "forgot" && <Button variant="outline" className="mt-3 w-full" onClick={google}>{t.admin.google}</Button>}
        <div className="mt-5 flex flex-wrap justify-between gap-2 text-sm">
          <button className="text-navy underline" onClick={() => setMode(mode === "up" ? "in" : "up")}>{mode === "up" ? t.admin.signIn : t.admin.signUp}</button>
          <button className="text-muted-foreground underline" onClick={() => setMode(mode === "forgot" ? "in" : "forgot")}>{mode === "forgot" ? t.admin.cancel : t.admin.forgot}</button>
        </div>
      </div>
    </div>
  );
}
