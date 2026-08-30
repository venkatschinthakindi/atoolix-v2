"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export function useQrScanner(scannerId: string) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const startingRef = useRef(false);
  const stoppingRef = useRef(false);
  const startTokenRef = useRef<symbol | null>(null);
  const imageTokenRef = useRef<symbol | null>(null);
  const didScanRef = useRef(false);
  const mountedRef = useRef(true);

  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [scanError, setScanError] = useState("");
  const [loading, setLoading] = useState(false);
  const [permissionHint, setPermissionHint] = useState("");

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      void stop();
    };
  }, []);

  async function stop() {
    const scanner = scannerRef.current;
    if (!scanner || stoppingRef.current) return;

    stoppingRef.current = true;
    const token = startTokenRef.current;

    try {
      await scanner.stop();
    } catch {
    }

    try {
      await scanner.clear();
    } catch {
    }

    if (startTokenRef.current === token) {
      scannerRef.current = null;
      startTokenRef.current = null;
      didScanRef.current = false;
      if (mountedRef.current) setScanning(false);
    }

    stoppingRef.current = false;
    if (mountedRef.current) setLoading(false);
  }

  async function start() {
    if (scannerRef.current || startingRef.current || stoppingRef.current) return;

    setScanError("");
    setPermissionHint("");
    setScanResult("");
    setLoading(true);
    startingRef.current = true;

    const token = Symbol("scan");
    startTokenRef.current = token;

    try {
      const scanner = new Html5Qrcode(scannerId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 12, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          if (didScanRef.current || startTokenRef.current !== token) return;
          didScanRef.current = true;
          if (mountedRef.current) setScanResult(decodedText);
          void stop();
        },
        (_errorMessage) => {
            // Ignore continuous decode failures while scanning.
            // These happen every frame until a QR code is found.
        }
      );

      if (startTokenRef.current !== token) return;
      if (mountedRef.current) setScanning(true);
    } catch (e: any) {
      if (startTokenRef.current !== token) return;
      const msg = e?.message || "Unable to access camera.";
      if (mountedRef.current) {
        setScanError(msg);
        setPermissionHint("Grant camera permission, refresh the page, or try another browser.");
        setScanning(false);
      }
      try {
        await scannerRef.current?.clear();
      } catch {
      }
      scannerRef.current = null;
      startTokenRef.current = null;
    } finally {
      startingRef.current = false;
      if (startTokenRef.current === token && mountedRef.current) setLoading(false);
    }
  }

  async function scanImage(file: File) {
    if (scanning) {
      await stop();
    }

    const token = Symbol("image-scan");
    imageTokenRef.current = token;

    setScanError("");
    setPermissionHint("");
    setScanResult("");
    setLoading(true);

    const scanner = new Html5Qrcode(scannerId);

    try {
      const result = await scanner.scanFile(file, true);
      if (imageTokenRef.current === token && mountedRef.current) setScanResult(result);
    } catch (e: any) {
      if (imageTokenRef.current === token && mountedRef.current) {
        setScanError(e?.message || "Could not decode QR from image.");
      }
    } finally {
      try {
        await scanner.clear();
      } catch {
      }
      if (imageTokenRef.current === token && mountedRef.current) setLoading(false);
    }
  }

  return {
    scanning,
    scanResult,
    scanError,
    permissionHint,
    loading,
    start,
    stop,
    scanImage,
    setScanResult,
    setScanError,
    setPermissionHint,
  };
}