"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

interface PwaContextValue {
  canInstall: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  registration: ServiceWorkerRegistration | null;
  updateAvailable: boolean;
  install(): Promise<void>;
  updateApp(): void;
}

const PwaContext = createContext<PwaContextValue | null>(null);

export function PwaProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [isInstalled, setInstalled] = useState(false);

  const [isOnline, setOnline] = useState(true);

  const [updateAvailable, setUpdateAvailable] = useState(false);
  // ----------------------------------------
  // Register Service Worker
  // ----------------------------------------

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    let mounted = true;

    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        if (!mounted) return;

        setRegistration(reg);
      })
      .catch((err) => {
        //console.error("[PWA]", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // ----------------------------------------
// Detect Service Worker Updates
// ----------------------------------------

useEffect(() => {
  if (!registration) {
    return;
  }

  // Already waiting?
  if (registration.waiting) {
    setUpdateAvailable(true);
  }

  const handleUpdateFound = () => {
    const worker = registration.installing;

    if (!worker) {
      return;
    }

    worker.addEventListener("statechange", () => {
      if (
        worker.state === "installed" &&
        navigator.serviceWorker.controller
      ) {
        //console.log("[PWA] New version available");

        setUpdateAvailable(true);
      }
    });
  };

  registration.addEventListener(
    "updatefound",
    handleUpdateFound
  );

  return () => {
    registration.removeEventListener(
      "updatefound",
      handleUpdateFound
    );
  };
}, [registration]);
  // ----------------------------------------
  // Install Prompt
  // ----------------------------------------

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true;

    setInstalled(standalone);

    const handleBeforeInstallPrompt = (event: Event) => {
      //console.log("[PWA] beforeinstallprompt fired");

      event.preventDefault();

      setInstallPrompt(event as BeforeInstallPromptEvent);

      //console.log("[PWA] Prompt stored");
    };

    const handleInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleInstalled
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleInstalled
      );
    };
  }, []);

  // ----------------------------------------
  // Online / Offline
  // ----------------------------------------

  useEffect(() => {
    const updateStatus = () => {
      setOnline(navigator.onLine);
    };

    updateStatus();

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  // ----------------------------------------
  // Install App
  // ----------------------------------------

  const install = useCallback(async () => {
    if (!installPrompt) {
      //warn("[PWA] Install prompt unavailable.");
      return;
    }

    await installPrompt.prompt();

    const result = await installPrompt.userChoice;

    setInstallPrompt(null);
  }, [installPrompt]);
  
  const updateApp = useCallback(() => {
    if (!registration?.waiting) {
      return;
    }

    registration.waiting.postMessage({
      type: "SKIP_WAITING",
    });
  }, [registration]);

  const value = useMemo(
    () => ({
      canInstall: !!installPrompt,
      isInstalled,
      isOnline,
      registration,
      updateAvailable,
      install,
      updateApp,
    }),
    [
      installPrompt,
      isInstalled,
      isOnline,
      registration,
      updateAvailable,
      install,
      updateApp,
    ]
  );

  return (
    <PwaContext.Provider value={value}>
      {children}
    </PwaContext.Provider>
  );
}

export function usePwa() {
  const context = useContext(PwaContext);

  if (!context) {
    throw new Error(
      "usePwa must be used inside PwaProvider"
    );
  }

  return context;
}