"use client";

import { useState, type FormEvent } from "react";
import { useContactModal } from "@/components/layout/ContactModalProvider";
import { CRM_CONSENT_TEXT } from "@/lib/crm";
import { formatPrice } from "@/lib/utils";
import type { ValuationResult } from "@/lib/valuation";
import { fieldLabelClass, fieldInputClass, submitButtonClass, submitArrowClass } from "@/components/ui/form-styles";

type Step = "address" | "details" | "success";
type SubmitStatus = "idle" | "submitting" | "error";

function RecapField({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="group">
      <p className={fieldLabelClass}>{label}</p>
      <div className="flex items-center justify-between gap-3 rounded-full bg-gray-100 px-5 py-3 transition-colors duration-300 group-hover:bg-white group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <span className="truncate text-sm text-black">{value}</span>
        <button
          type="button"
          onClick={onEdit}
          className="shrink-0 text-xs font-semibold uppercase tracking-widest text-kw-red transition-transform hover:scale-105 hover:underline"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export function ValuationForm() {
  const [step, setStep] = useState<Step>("address");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const { openContactModal } = useContactModal();

  function handleAddressSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address.trim() || !name.trim() || !email.trim()) return;
    setStep("details");
  }

  async function handleDetailsSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      address: {
        street: address,
        city: String(form.get("city") ?? "Brownwood"),
        state: "TX",
        zip: String(form.get("zip") ?? ""),
      },
      name,
      email,
      phone: String(form.get("phone") ?? ""),
      interest: String(form.get("interest") ?? "selling"),
      consent: form.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setResult(data.result);
      setStep("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  if (step === "success" && result) {
    return (
      <div className="w-full max-w-xl bg-white p-8 text-center shadow-2xl sm:p-10">
        <p className="font-nav text-xs uppercase tracking-[0.3em] text-kw-red">Estimated Home Value</p>
        <p className="mt-3 text-4xl font-bold text-black sm:text-5xl">{formatPrice(result.estimate)}</p>
        <p className="mt-2 text-sm text-gray-600">
          Estimated range: {formatPrice(result.rangeLow)} &ndash; {formatPrice(result.rangeHigh)}
        </p>
        <p className="mt-4 text-sm text-gray-600">
          This is an automated estimate, not a formal appraisal &mdash; Justin will follow up with a
          detailed comparative market analysis.
        </p>
        <button type="button" onClick={openContactModal} className={`mt-8 ${submitButtonClass}`}>
          Schedule a Consultation
          <span aria-hidden className={submitArrowClass} />
        </button>
      </div>
    );
  }

  if (step === "details") {
    return (
      <form onSubmit={handleDetailsSubmit} className="w-full max-w-xl space-y-5 bg-white p-8 shadow-2xl sm:p-10">
        <div className="grid gap-5 sm:grid-cols-2">
          <RecapField label="Property Address" value={address} onEdit={() => setStep("address")} />
          <RecapField label="Name & Email" value={`${name} · ${email}`} onEdit={() => setStep("address")} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="group">
            <label className={fieldLabelClass}>City</label>
            <input name="city" defaultValue="Brownwood" required className={fieldInputClass} />
          </div>
          <div className="group">
            <label className={fieldLabelClass}>ZIP Code</label>
            <input name="zip" required placeholder="76801" className={fieldInputClass} />
          </div>
        </div>

        <div className="group">
          <label className={fieldLabelClass}>Phone</label>
          <input name="phone" type="tel" required placeholder="Your phone" className={fieldInputClass} />
        </div>

        <fieldset className="flex flex-wrap gap-4 text-sm">
          <legend className={fieldLabelClass}>I am interested in</legend>
          {(["buying", "selling", "both"] as const).map((option) => (
            <label key={option} className="flex cursor-pointer items-center gap-2 text-black transition-transform hover:scale-105">
              <input
                type="radio"
                name="interest"
                value={option}
                defaultChecked={option === "selling"}
                className="accent-kw-red"
              />
              <span className="capitalize">{option}</span>
            </label>
          ))}
        </fieldset>

        <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-500">
          <input type="checkbox" name="consent" required className="mt-1 accent-kw-red" />
          <span>{CRM_CONSENT_TEXT}</span>
        </label>

        {error && <p className="text-sm text-kw-red">{error}</p>}

        <button type="submit" disabled={status === "submitting"} className={submitButtonClass}>
          {status === "submitting" ? "Calculating..." : "Get My Home Value"}
          <span aria-hidden className={submitArrowClass} />
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleAddressSubmit} className="w-full max-w-2xl space-y-4 bg-white p-6 shadow-2xl sm:p-8">
      <div className="group">
        <label className={fieldLabelClass}>Property Address</label>
        <div className="flex items-center gap-3 rounded-full border-2 border-transparent bg-gray-100 px-5 py-3 transition-all duration-300 ease-out group-hover:bg-white group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] group-focus-within:border-kw-red group-focus-within:bg-white group-focus-within:shadow-[0_8px_30px_rgba(206,1,31,0.15)]">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 text-kw-red transition-transform duration-300 group-focus-within:scale-110"
            fill="currentColor"
          >
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
          </svg>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter your home address..."
            className="w-full bg-transparent text-sm text-black placeholder:text-gray-400 outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="group">
          <label className={fieldLabelClass}>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
            className={fieldInputClass}
          />
        </div>
        <div className="group">
          <label className={fieldLabelClass}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="you@email.com"
            className={fieldInputClass}
          />
        </div>
      </div>

      <button type="submit" className={`w-full justify-center sm:w-auto ${submitButtonClass}`}>
        Get a Free Home Valuation
        <span aria-hidden className={submitArrowClass} />
      </button>
    </form>
  );
}
