"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";

const WEB3FORMS_ACCESS_KEY = "a408a8e0-5e02-4b05-bd91-b5e9f4e6661d";

export default function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New contact form submission from ${formData.name}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to send");
      }

      // only clear the form and show success after the email actually sent
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error("Contact form submit error:", err);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-dark-bg">
      <div className="max-w-2xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-6">
            {t("contact.kicker")}
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-3xl lg:text-4xl font-black tracking-tight text-white mb-10 leading-tight">
            {t("contact.title")}
          </h2>

          {submitted ? (
            <div role="status" aria-live="polite" className="flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-2xl p-6">
              <CheckCircle size={20} className="text-accent shrink-0" />
              <p className="text-white text-sm">{t("contact.success")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-white/70 text-sm mb-2"
                >
                  {t("contact.name")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contact.namePlaceholder")}
                  required
                  disabled={sending}
                  className="w-full bg-surface-dark border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-white/70 text-sm mb-2"
                >
                  {t("contact.email")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contact.emailPlaceholder")}
                  required
                  disabled={sending}
                  className="w-full bg-surface-dark border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-white/70 text-sm mb-2"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.messagePlaceholder")}
                  required
                  rows={5}
                  disabled={sending}
                  className="w-full bg-surface-dark border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:border-accent focus:outline-none transition-colors resize-none disabled:opacity-50"
                />
              </div>

              {error && (
                <p role="alert" className="text-red-400 text-sm">
                  {t("contact.error") ?? "Something went wrong. Please try again."}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3.5 text-sm font-bold tracking-wider uppercase hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? "..." : t("contact.submit")}
                <Send size={16} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}