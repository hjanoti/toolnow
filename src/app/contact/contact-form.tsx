"use client";

import { useState } from "react";
import Link from "next/link";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [status, setStatus] = useState<Status>("idle");

  const configured = Boolean(WEB3FORMS_KEY);

  function validate() {
    const next: typeof errors = {};
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (!cleanName) {
      next.name = "Please enter your name.";
    } else if (cleanName.length > MAX_NAME_LENGTH) {
      next.name = `Please keep your name under ${MAX_NAME_LENGTH} characters.`;
    }

    if (!cleanEmail) {
      next.email = "Please enter your email address.";
    } else if (cleanEmail.length > MAX_EMAIL_LENGTH) {
      next.email = `Please keep your email under ${MAX_EMAIL_LENGTH} characters.`;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      next.email = "That doesn't look like a valid email address.";
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      next.message = "Please write a message (at least 10 characters).";
    } else if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
      next.message =
        `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured || !validate()) return;

    // Honeypot: real users never see or fill this field.
    const form = e.currentTarget;
    const botcheck = form.elements.namedItem("botcheck") as HTMLInputElement;
    if (botcheck?.value.trim()) return;

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New message from the ToolNow contact form",
          from_name: "ToolNow Contact Form",
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          botcheck: false,
        }),
      });
      const data: { success?: boolean } = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-200 bg-brand-50 p-6"
      >
        <p className="font-semibold text-brand-800">Message sent — thank you!</p>
        <p className="mt-2 text-sm text-ink-600">
          We read every message and reply when a response is needed. If your
          message was about a calculation bug, we&apos;ll look into it right
          away.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {!configured ? (
        <p
          role="status"
          className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
        >
          Contact form is being set up — meanwhile see{" "}
          <Link href="/about" className="font-semibold underline">
            /about
          </Link>
          .
        </p>
      ) : null}

      {/* Honeypot field — hidden from real users, catches naive bots. */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            maxLength={MAX_NAME_LENGTH}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!configured || status === "submitting"}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            required
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-sm text-red-600">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={MAX_EMAIL_LENGTH}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!configured || status === "submitting"}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            required
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-sm text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="What's on your mind? Bug reports, tool ideas and privacy requests all welcome."
          minLength={10}
          maxLength={MAX_MESSAGE_LENGTH}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!configured || status === "submitting"}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          required
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-1.5 text-sm text-red-600">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          Something went wrong sending your message. Please try again in a
          minute.
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="mt-6"
        disabled={!configured || status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
