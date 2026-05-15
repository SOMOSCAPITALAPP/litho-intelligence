"use client";

import { Download, Share2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isStandaloneDisplay() {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(display-mode: standalone)").matches || Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);
}

function isIOSDevice() {
  if (typeof navigator === "undefined") return false;

  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isSocialInAppBrowser() {
  if (typeof navigator === "undefined") return false;

  return /FBAN|FBAV|Instagram|Line|LinkedInApp|Twitter|TikTok/i.test(navigator.userAgent);
}

export function InstallAppPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const ios = useMemo(() => isIOSDevice(), []);
  const inAppBrowser = useMemo(() => isSocialInAppBrowser(), []);

  useEffect(() => {
    setIsStandalone(isStandaloneDisplay());
    setDismissed(localStorage.getItem("litho-install-prompt-dismissed") === "true");

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setDismissed(localStorage.getItem("litho-install-prompt-dismissed") === "true");
    };

    const handleInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
      localStorage.setItem("litho-install-prompt-dismissed", "true");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  useEffect(() => {
    if ((ios || inAppBrowser) && !isStandalone) {
      setDismissed(localStorage.getItem("litho-install-prompt-dismissed") === "true");
    }
  }, [ios, inAppBrowser, isStandalone]);

  if (isStandalone || dismissed || (!deferredPrompt && !ios && !inAppBrowser)) {
    return null;
  }

  const dismiss = () => {
    localStorage.setItem("litho-install-prompt-dismissed", "true");
    setDismissed(true);
  };

  const install = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      localStorage.setItem("litho-install-prompt-dismissed", "true");
    }

    setDeferredPrompt(null);
  };

  return (
    <aside className="install-app-prompt" aria-label="Installer Litho Intelligence">
      <button className="install-app-dismiss" type="button" onClick={dismiss} aria-label="Masquer l'installation">
        <X size={16} />
      </button>
      <div className="install-app-icon" aria-hidden="true">
        {ios || inAppBrowser ? <Share2 size={18} /> : <Download size={18} />}
      </div>
      <div>
        <strong>Installer Litho Intelligence</strong>
        <p>
          {inAppBrowser
            ? "Ouvrez cette page dans Safari ou Chrome pour installer l'application sur votre écran d'accueil."
            : ios
              ? "Sur iPhone : ouvrez Partager, puis Ajouter à l'écran d'accueil."
              : "Ajoutez l'application à votre écran d'accueil en un geste."}
        </p>
      </div>
      {deferredPrompt ? (
        <button className="button gold-button install-app-button" type="button" onClick={install}>
          Installer
        </button>
      ) : null}
    </aside>
  );
}
