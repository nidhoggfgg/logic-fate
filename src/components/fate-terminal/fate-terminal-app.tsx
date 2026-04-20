"use client";

import { startTransition, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LandingPanel } from "@/components/fate-terminal/landing-panel";
import { IntakePanel } from "@/components/fate-terminal/intake-panel";
import { ResultPanel } from "@/components/fate-terminal/result-panel";
import { ScanPanel } from "@/components/fate-terminal/scan-panel";
import { generateFateReading, type FateReading } from "@/lib/reading-engine";
import { fateFormSchema, type FateFormValues } from "@/lib/reading-schema";

type FlowStep = "landing" | "profile" | "intent" | "scan" | "result";

const profileFields: Array<keyof FateFormValues> = [
  "name",
  "gender",
  "birthDate",
  "birthTime",
  "relationshipStatus"
];

const intentFields: Array<keyof FateFormValues> = [
  "occupation",
  "focusArea",
  "question",
  "recentIssue"
];

const defaultValues: FateFormValues = {
  name: "",
  alias: "",
  gender: "",
  birthDate: "",
  birthTime: "",
  relationshipStatus: "",
  occupation: "",
  focusArea: "",
  question: "",
  recentIssue: ""
};

export function FateTerminalApp() {
  const [step, setStep] = useState<FlowStep>("landing");
  const [submittedValues, setSubmittedValues] = useState<FateFormValues | null>(null);
  const [reading, setReading] = useState<FateReading | null>(null);

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FateFormValues>({
    resolver: zodResolver(fateFormSchema),
    defaultValues,
    mode: "onTouched"
  });

  useEffect(() => {
    if (step !== "scan" || !submittedValues) {
      return;
    }

    const timer = window.setTimeout(() => {
      const nextReading = generateFateReading(submittedValues);
      setReading(nextReading);
      startTransition(() => setStep("result"));
    }, 3900);

    return () => window.clearTimeout(timer);
  }, [step, submittedValues]);

  async function handleProfileNext() {
    const isValid = await trigger(profileFields);
    if (!isValid) {
      return;
    }

    startTransition(() => setStep("intent"));
  }

  async function handleBeginReading() {
    const isValid = await trigger(intentFields);
    if (!isValid) {
      return;
    }

    await handleSubmit((values) => {
      setSubmittedValues(values);
      setReading(null);
      startTransition(() => setStep("scan"));
    })();
  }

  function handleRestart() {
    reset(defaultValues);
    setSubmittedValues(null);
    setReading(null);
    startTransition(() => setStep("landing"));
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === "landing" ? <LandingPanel onEnter={() => setStep("profile")} /> : null}

          {step === "profile" ? (
            <IntakePanel
              step="profile"
              control={control}
              errors={errors}
              onBack={() => setStep("landing")}
              onNext={handleProfileNext}
              onSubmit={handleBeginReading}
            />
          ) : null}

          {step === "intent" ? (
            <IntakePanel
              step="intent"
              control={control}
              errors={errors}
              onBack={() => setStep("profile")}
              onNext={handleProfileNext}
              onSubmit={handleBeginReading}
            />
          ) : null}

          {step === "scan" && submittedValues ? <ScanPanel values={submittedValues} /> : null}

          {step === "result" && reading ? (
            <div className="px-4 py-6 md:px-8 md:py-8">
              <div className="mx-auto max-w-7xl">
                <ResultPanel reading={reading} onRestart={handleRestart} />
              </div>
            </div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
