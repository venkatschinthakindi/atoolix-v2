"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
  install(): Promise<void>;
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

  // Guards against reloading twice if controllerchange fires more than once.
  const reloadingRef = useRef(false);

  // ----------------------------------------
  // Register Service Worker
  // ----------------------------------------

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    let intervalId: number | undefined;

    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        intervalId = window.setInterval(() => {
          reg.update().catch(() => {});
        }, 60 * 60 * 1000);

        setRegistration(reg);
      })
      .catch(() => {
        // optional: log in development
      });

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  // ----------------------------------------
  // Reload once the new SW actually takes control
  // ----------------------------------------

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const handleControllerChange = () => {
      if (reloadingRef.current) return;
      reloadingRef.current = true;
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange
    );

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange
      );
    };
  }, []);

  // ----------------------------------------
  // Detect Service Worker Updates
  // ----------------------------------------

  useEffect(() => {
    if (!registration) {
      return;
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
          worker.postMessage({
              type: "SKIP_WAITING",
          });
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

    await installPrompt.userChoice;

    setInstallPrompt(null);
  }, [installPrompt]);

  const value = useMemo(
    () => ({
      canInstall: !!installPrompt,
      isInstalled,
      isOnline,
      registration,
      install,
    }),
    [
      installPrompt,
      isInstalled,
      isOnline,
      registration,
      install,
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