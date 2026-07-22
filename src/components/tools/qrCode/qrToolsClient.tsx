"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { defaultQrForm } from "@/components/tools/qrCode/qrData";
import type { PreviewState, QrFormState, QrType, TabKey, ScanActionType } from "@/components/tools/qrCode/qrTypes";
import { useQrCode } from "@/components/tools/qrCode/hooks/useQrCode";
import { useQrScanner } from "@/components/tools/qrCode/hooks/qrScanner";
import { QRGeneratorPanel } from "@/components/tools/qrCode/components/qrGeneratorPanel";
import { QRScannerPanel } from "@/components/tools/qrCode/components/qrScannerPanel";
import { QRPreviewCard } from "@/components/tools/qrCode/components/qrPreviewCard";
import { ScanResultModal } from "@/components/tools/qrCode/components/scanResultModal";
import { blobToDataUrl, dataUrlToBlob, exportQrPdf } from "@/components/tools/qrCode/qrExport";
import { downloadBlob } from "@/lib/download";
import {
  isMobileLike,
  isSafeExternalUrl,
  sanitizeDownloadName,
  todayStamp,
  isValidEmail,
  isValidPhone,
  isValidLatLng,
  isValidUrlLike,
  safeScanTarget,
} from "@/components/tools/qrCode/qrUtils";

const ImagePreviewModal = dynamic(
  () => import("@/components/ui/image/imagePreviewModal").then((m) => m.ImagePreviewModal),
  { ssr: false }
);

function safeId(prefix: string, raw: string) {
  return `${prefix}-${raw.replace(/:/g, "")}`;
}

function detectActionType(text: string): ScanActionType {
  if (/^mailto:/i.test(text)) return "email";
  if (/^tel:/i.test(text)) return "phone";
  if (/^sms:/i.test(text)) return "sms";
  if (/^geo:/i.test(text)) return "geo";
  if (/^WIFI:/i.test(text)) return "wifi";
  if (/^BEGIN:VCARD/i.test(text)) return "vcard";
  if (/^https?:\/\//i.test(text)) return "url";
  return "text";
}

export default function QRToolsClient() {
  const [tab, setTab] = useState<TabKey>("generate");
  const [type, setType] = useState<QrType>("url");
  const [form, setForm] = useState<QrFormState>(defaultQrForm);
  const [fg, setFg] = useState("#111827");
  const [bg, setBg] = useState("#c4b4a7");
  const [size, setSize] = useState(320);
  const [ecLevel, setEcLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [logo, setLogo] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<PreviewState>({
    open: false,
    url: null,
    variant: "qr",
    documentName: "atoolix-qr.png",
  });
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const previewTokenRef = useRef(0);
  const logoTokenRef = useRef(0);

  const rawScannerId = useId();
  const scannerId = useMemo(() => safeId("qr-scanner", rawScannerId), [rawScannerId]);

  const { ref: qrRef, instanceRef } = useQrCode({ type, form, fg, bg, size, ecLevel, logo });

  const {
    scanning,
    scanResult,
    scanError,
    permissionHint,
    loading,
    start,
    stop,
    scanImage,
    setScanError,
    setPermissionHint,
  } = useQrScanner(scannerId);

  const errors = useMemo(() => {
    const list: string[] = [];

    if (type === "url" && !form.url) list.push("URL is required.");
    if (type === "url" && form.url && !isValidUrlLike(form.url)) list.push("URL should be a valid http/https address.");
    if (type === "text" && !form.text) list.push("Text is required.");
    if (type === "email" && (!form.email || !form.subject || !form.body)) list.push("Email, subject, and body are required.");
    if (type === "email" && form.email && !isValidEmail(form.email)) list.push("Email is invalid.");
    if (type === "phone" && (!form.phone || !isValidPhone(form.phone))) list.push("Phone number is invalid.");
    if (type === "sms" && (!form.smsPhone || !form.smsMessage || !isValidPhone(form.smsPhone))) list.push("SMS number and message are required and must be valid.");
    if (type === "wifi" && !["WPA", "WPA2", "WPA3", "WEP", "nopass"].includes(form.wifiSecurity)) list.push("WiFi security must be one of WPA, WPA2, WPA3, WEP, or nopass.");
    if (type === "wifi" && (!form.wifiSsid || (form.wifiSecurity !== "nopass" && !form.wifiPassword))) list.push("WiFi SSID and password are required.");
    if (type === "vcard" && (!form.firstName || !form.lastName || !form.vcardEmail || !form.vcardPhone || !form.vcardUrl || !isValidUrlLike(form.vcardUrl) || !isValidEmail(form.vcardEmail))) list.push("vCard name, email, phone, and website are required and valid.");
    if (type === "location" && (!form.lat || !form.lng || !isValidLatLng(form.lat, form.lng))) list.push("Location coordinates are required and valid.");

    return list;
  }, [type, form]);

  const revokePreviewUrl = useCallback((url: string | null) => {
    if (url) URL.revokeObjectURL(url);
  }, []);

  const buildPreview = useCallback(async () => {
    const blob = await instanceRef.current?.getRawData("png");
    if (!(blob instanceof Blob)) return null;

    return URL.createObjectURL(blob);
  }, [instanceRef]);

  const openPreview = useCallback(async () => {
    if (errors.length > 0) return;
    const token = ++previewTokenRef.current;
    const url = await buildPreview();
    if (!url || token !== previewTokenRef.current) {
      revokePreviewUrl(url);
      return;
    }
    setPreview((prev) => {
      revokePreviewUrl(prev.url);
      return { open: true, url, variant: "qr", documentName: `qr-${type}-${todayStamp()}.png` };
    });
  }, [buildPreview, errors.length, revokePreviewUrl, type]);

  const closePreview = useCallback(() => {
    previewTokenRef.current++;
    setPreview((prev) => {
      revokePreviewUrl(prev.url);
      return { ...prev, open: false, url: null };
    });
  }, [revokePreviewUrl]);

  useEffect(() => {
    return () => {
      revokePreviewUrl(preview.url);
    };
  }, [preview.url, revokePreviewUrl]);

  useEffect(() => {
    if (tab !== "scanner") void stop();
  }, [tab, stop]);

  useEffect(() => {
    if (scanResult) {
      setScanModalOpen(true);
      setPermissionHint("");
    }
  }, [scanResult, setPermissionHint]);

  const handleLogo = useCallback(async (file?: File | null) => {
    logoTokenRef.current++;

    if (!file) {
      setLogo(undefined);
      return;
    }

    if (!["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(file.type) && !/\.svg$/i.test(file.name)) return;
    if (file.size > 2 * 1024 * 1024) return;

    const token = logoTokenRef.current;
    const reader = new FileReader();

    reader.onload = () => {
      if (token !== logoTokenRef.current) return;
      setLogo(String(reader.result || ""));
    };

    reader.onerror = reader.onabort = () => {
      if (token !== logoTokenRef.current) return;
      setLogo(undefined);
    };

    reader.readAsDataURL(file);
  }, []);

  const downloadPng = useCallback(async () => {
    if (errors.length > 0) return;

    setBusy(true);

    try {
        const blob = await instanceRef.current?.getRawData?.("png");

        if (!(blob instanceof Blob)) return;

        downloadBlob(`qr-${type}-${todayStamp()}.png`, blob);
    } finally {
        setBusy(false);
    }
    }, [errors.length, instanceRef, type]);

  const downloadSvg = useCallback(async () => {
    if (errors.length > 0) return;
    setBusy(true);
    try {
      const blob = await instanceRef.current?.getRawData?.("svg");
      if (blob instanceof Blob) downloadBlob(`qr-${type}-${todayStamp()}.svg`, blob);
    } finally {
      setBusy(false);
    }
  }, [errors.length, instanceRef, type]);

  const downloadPdf = useCallback(async () => {
    if (errors.length > 0) return;

    setBusy(true);

    try {
        const blob = await instanceRef.current?.getRawData?.("png");

        if (!(blob instanceof Blob)) return;

        const dataUrl = await blobToDataUrl(blob);

        await exportQrPdf(
        dataUrl,
        sanitizeDownloadName(`qr-${type}-${todayStamp()}`)
        );
    } finally {
        setBusy(false);
    }
    }, [errors.length, instanceRef, type]);

  const copyScan = useCallback(async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        setScanError("Clipboard API is unavailable in this browser.");
        return;
      }
      await navigator.clipboard.writeText(scanResult);
    } catch {
      setScanError("Copy failed.");
    }
  }, [scanResult, setScanError]);

  const openScanAction = useCallback(() => {
    const t = scanResult.trim();
    const safe = safeScanTarget(t);
    if (!safe) {
      setScanError("This QR contains plain text or an unsupported payload.");
      return;
    }

    if (/^mailto:/i.test(safe) || /^tel:/i.test(safe) || /^sms:/i.test(safe)) {
      window.location.href = safe;
      return;
    }

    if (/^geo:/i.test(safe)) {
      if (isMobileLike()) {
        window.location.href = safe;
      } else {
        navigator.clipboard?.writeText(safe).catch(() => {});
        setScanError("Geo links are best opened on mobile. Coordinates copied instead.");
      }
      return;
    }

    window.open(safe, "_blank", "noopener,noreferrer");
  }, [scanResult, setScanError]);

  const onImageScan = useCallback(
    async (file?: File | null) => {
      if (!file) return;
      if (!["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(file.type) && !/\.svg$/i.test(file.name)) {
        setScanError("Only PNG, JPG, JPEG, WEBP, and SVG images are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setScanError("File too large. Max 5MB.");
        return;
      }
      await scanImage(file);
    },
    [scanImage, setScanError]
  );

  const scanActionType = detectActionType(scanResult);
  const hasErrors = errors.length > 0;
  const actionLabel =
    scanActionType === "url"
      ? "Open URL"
      : scanActionType === "email"
        ? "Open Email"
        : scanActionType === "phone"
          ? "Call"
          : scanActionType === "sms"
            ? "Open SMS"
            : scanActionType === "geo"
              ? "Open Maps"
              : scanActionType === "wifi"
                ? "WiFi"
                : scanActionType === "vcard"
                  ? "vCard"
                  : "Open";

  return (
  <div className="min-h-screen text-white">
    <div className="grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur-md sm:p-6">
        <div className="mb-6 flex gap-2 rounded-2xl bg-black/20 p-1">
          <button
            onClick={() => setTab("generate")}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${
              tab === "generate" ? "bg-green-500 text-slate-900 shadow-sm" : "text-white/70"
            }`}
          >
            Generate QR
          </button>
          <button
            onClick={() => setTab("scanner")}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${
              tab === "scanner" ? "bg-green-500 text-slate-900 shadow-sm" : "text-white/70"
            }`}
          >
            Scan QR
          </button>
        </div>

        {tab === "generate" ? (
          <QRGeneratorPanel
            type={type}
            setType={setType}
            form={form}
            setForm={setForm}
            fg={fg}
            setFg={setFg}
            bg={bg}
            setBg={setBg}
            size={size}
            setSize={setSize}
            ecLevel={ecLevel}
            setEcLevel={setEcLevel}
            onLogo={handleLogo}
            onOpenPreview={openPreview}
            onPng={downloadPng}
            onSvg={downloadSvg}
            onPdf={downloadPdf}
            busy={busy}
            hasErrors={hasErrors}
          />
        ) : (
          <QRScannerPanel
            scannerId={scannerId}
            scanning={scanning}
            loading={loading}
            scanResult={scanResult}
            scanError={scanError}
            permissionHint={permissionHint}
            onStart={start}
            onStop={stop}
            onImage={onImageScan}
            onCopy={copyScan}
            onOpenAction={openScanAction}
            onPreview={() => setScanModalOpen(true)}
            actionLabel={actionLabel}
          />
        )}
      </section>

      <aside className="grid gap-6">
        <QRPreviewCard refEl={qrRef} onOpenModal={openPreview} loading={loading} />
      </aside>
    </div>

    {preview.open && preview.url && (
      <ImagePreviewModal
        key={preview.url}
        url={preview.url}
        onClose={closePreview}
        documentName={preview.documentName}
        variant="preview"
        onDownload={preview.variant === "qr" ? downloadPng : undefined}
      />
    )}

    <ScanResultModal
      open={scanModalOpen}
      text={scanResult}
      onClose={() => setScanModalOpen(false)}
      onCopy={copyScan}
      onOpen={openScanAction}
      actionType={scanActionType}
    />
  </div>
);
}