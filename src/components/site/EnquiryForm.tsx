import { useId, useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappLink, mailLink, gmailLink } from "@/lib/contact";
import { Button } from "@/components/ui/button";

export type Field = { key: string; label: string; type?: "text" | "email" | "tel" | "textarea" | "select"; options?: string[]; full?: boolean };

export function buildMessage(title: string, fields: Field[], values: Record<string, string>) {
  const lines = fields.filter((f) => values[f.key]?.trim()).map((f) => `${f.label}: ${(values[f.key] ?? "").trim()}`);
  return `${title}\n\n${lines.join("\n")}`;
}

const inputCls = "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-ring/30";

export function EnquiryForm({ title, fields, subject }: { title: string; fields: Field[]; subject: string }) {
  const { t } = useI18n();
  const formId = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    const msgKey = fields.find((f) => f.type === "textarea")?.key;
    if (!values["name"]?.trim() || (msgKey && !values[msgKey]?.trim()) || !consent) { setError(t.form.required); return false; }
    setError("");
    return true;
  };
  const text = buildMessage(subject, fields, values);

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-elegant md:p-8">
      <h2 className="text-2xl font-bold text-navy">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t.form.hint}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.key} htmlFor={`${formId}-${f.key}`} className={`grid gap-1.5 text-sm font-medium ${f.full || f.type === "textarea" ? "sm:col-span-2" : ""}`}>
            {f.label}
            {f.type === "textarea" ? (
              <textarea id={`${formId}-${f.key}`} rows={4} maxLength={1500} className={inputCls} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
            ) : f.type === "select" ? (
              <select id={`${formId}-${f.key}`} className={inputCls} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}>
                <option value="">—</option>
                {f.options?.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <input id={`${formId}-${f.key}`} type={f.type ?? "text"} maxLength={200} className={inputCls} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
            )}
          </label>
        ))}
      </div>
      <label htmlFor={`${formId}-consent`} className="mt-5 flex items-start gap-2.5 text-sm text-muted-foreground">
        <input id={`${formId}-consent`} type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-gold" />
        {t.form.consent}
      </label>
      {error && <p className="mt-3 text-sm font-medium text-destructive">{error}</p>}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="whatsapp" size="lg" onClick={() => { if (validate()) window.open(whatsappLink(text), "_blank", "noopener,noreferrer"); }}><MessageCircle />{t.common.sendWhatsapp}</Button>
        <Button asChild variant="default" size="lg"><a href={mailLink(subject, text)} onClick={(event) => { if (!validate()) event.preventDefault(); }}><Mail />{t.common.sendEmail}</a></Button>
        <Button asChild variant="outline" size="lg"><a href={gmailLink(subject, text)} target="_blank" rel="noreferrer" onClick={(event) => { if (!validate()) event.preventDefault(); }}><Mail />{t.form.gmail}</a></Button>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t.form.emailNote}</p>
    </div>
  );
}
