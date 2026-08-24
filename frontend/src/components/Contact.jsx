import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, Copy, Check, Linkedin, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { PROFILE } from "../data/portfolio";

const WEB3FORMS_ACCESS_KEY = "9cd79d2e-b26c-44f9-b84f-e1ea148c2d20";

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy — long-press the email instead");
    }
  };

  const onSubmit = async (data) => {
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio contact from ${data.name}`,
          from_name: data.name,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || result.success === false) {
        throw new Error(result.message || "Send failed");
      }
      setSent(true);
      toast.success("Message sent — I'll get back to you soon.");
      reset();
      setTimeout(() => setSent(false), 5000);
    } catch (e) {
      toast.error(e.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full glass-panel rounded-2xl px-5 py-4 text-sm md:text-base outline-none transition-[border-color,box-shadow] duration-300 focus:border-[var(--glow)] focus:shadow-[0_0_24px_-6px_var(--glow)] placeholder:text-[var(--muted)]";

  return (
    <section id="contact" data-testid="contact-section" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeading index="06" kicker="Final Approach" title="Let's talk" />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          <Reveal>
            <div className="space-y-6">
              <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
                Open to administration, customer service and operations roles — or a good
                conversation about aviation, sustainability and AI. My inbox has a fast turnaround.
              </p>

              <div
                data-testid="contact-email-row"
                className="flex items-center justify-between gap-4 glass-panel rounded-2xl px-5 py-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Mail size={18} style={{ color: "var(--glow)" }} className="shrink-0" />
                  <span className="font-code text-sm truncate" data-testid="contact-email-text">
                    {PROFILE.email}
                  </span>
                </div>
                <button
                  data-testid="copy-email-btn"
                  onClick={copyEmail}
                  aria-label="Copy email"
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  style={{
                    background: copied ? "var(--glow)" : "var(--surface-2)",
                    color: copied ? "#03040b" : "var(--glow)",
                  }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              <div className="space-y-3">
                <a
                  data-testid="contact-phone-link"
                  href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm transition-colors duration-300 hover:text-[var(--glow)]"
                  style={{ color: "var(--muted)" }}
                >
                  <Phone size={16} style={{ color: "var(--glow)" }} /> {PROFILE.phone}
                </a>
                <p className="flex items-center gap-3 text-sm" style={{ color: "var(--muted)" }}>
                  <MapPin size={16} style={{ color: "var(--glow)" }} /> {PROFILE.location} · UAE Driving Licence
                </p>
                <a
                  data-testid="contact-linkedin-link"
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors duration-300 hover:text-[var(--glow)]"
                  style={{ color: "var(--muted)" }}
                >
                  <Linkedin size={16} style={{ color: "var(--glow)" }} /> linkedin.com/in/mohdabzan
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              data-testid="contact-form"
              onSubmit={handleSubmit(onSubmit)}
              className="glass-panel rounded-3xl p-7 md:p-10 space-y-5"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <input
                    data-testid="contact-name-input"
                    placeholder="Your name"
                    className={inputCls}
                    {...register("name", { required: "Name is required", minLength: { value: 2, message: "At least 2 characters" } })}
                  />
                  {errors.name && (
                    <p data-testid="contact-name-error" className="mt-2 text-xs" style={{ color: "#f87171" }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    data-testid="contact-email-input"
                    placeholder="Your email"
                    type="email"
                    className={inputCls}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                    })}
                  />
                  {errors.email && (
                    <p data-testid="contact-email-error" className="mt-2 text-xs" style={{ color: "#f87171" }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <textarea
                  data-testid="contact-message-input"
                  placeholder="Your message (min. 10 characters)"
                  rows={6}
                  className={`${inputCls} resize-none`}
                  {...register("message", { required: "Message is required", minLength: { value: 10, message: "At least 10 characters" } })}
                />
                {errors.message && (
                  <p data-testid="contact-message-error" className="mt-2 text-xs" style={{ color: "#f87171" }}>
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                data-testid="contact-submit-btn"
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-display text-sm font-semibold glow-emerald disabled:opacity-60"
                style={{ background: sent ? "var(--amber)" : "var(--glow)", color: "#03040b" }}
              >
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : sent ? (
                  <>
                    <Check size={16} /> Message received
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send message
                  </>
                )}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
