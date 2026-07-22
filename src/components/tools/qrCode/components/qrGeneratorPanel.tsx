"use client";

import { memo, useCallback, useRef, useState } from "react";
import { QrFormState, QrType } from "@/components/tools/qrCode/qrTypes";
import { QRDownloadButtons } from "@/components/tools/qrCode/components/qrDownloadButtons";
import { FileUp } from "lucide-react";
import CustomSelect from "@/components/ui/customSelect";

type Props = {
  type: QrType;
  setType: (v: QrType) => void;
  form: QrFormState;
  setForm: React.Dispatch<React.SetStateAction<QrFormState>>;
  fg: string;
  setFg: (v: string) => void;
  bg: string;
  setBg: (v: string) => void;
  size: number;
  setSize: (v: number) => void;
  ecLevel: "L" | "M" | "Q" | "H";
  setEcLevel: (v: "L" | "M" | "Q" | "H") => void;
  onLogo: (file?: File | null) => void;
  onOpenPreview: () => void;
  onPng: () => Promise<void>;
  onSvg: () => Promise<void>;
  onPdf: () => Promise<void>;
  busy?: boolean;
  hasErrors?: boolean;
};

function QRGeneratorPanelImpl({
  type,
  setType,
  form,
  setForm,
  fg,
  setFg,
  bg,
  setBg,
  size,
  setSize,
  ecLevel,
  setEcLevel,
  onLogo,
  onOpenPreview,
  onPng,
  onSvg,
  onPdf,
  busy,
  hasErrors,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [format, setFormat] = useState<"png" | "svg" | "pdf">("png");
  const download = useCallback(async () => {
    switch (format) {
        case "png":
            return onPng();

        case "svg":
            return onSvg();

        case "pdf":
            return onPdf();
    }
}, [format, onPng, onSvg, onPdf]);
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
       <CustomSelect
            label="QR Type"
            value={type}
            callBackTrigger = {(e) => setType(e as QrType)}
            options={[
                          { value: "url", label: "URL" },
                          { value: "text", label: "Text" },
                          { value: "email", label: "Email" },
                          { value: "phone", label: "Phone" },
                          { value: "sms", label: "SMS" },
                          { value: "wifi", label: "WiFi" },
                          { value: "vcard", label: "vCard" },
                          { value: "location", label: "Location" }
                      ]}
            placeholder="Select mode"
        />

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Size: {size}px</span>
          <input type="range" min={192} max={1024} step={16} value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </label>
      </div>

      <div className="grid gap-3 rounded-2xl border p-4">
        {type === "url" && <input value={form.url} onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3 outline-none focus:border-indigo-500" placeholder="https://..." />}

        {type === "text" && <textarea value={form.text} onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))} className="min-h-28 rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500" placeholder="Enter text" />}

        {type === "email" && (
          <>
            <input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Email" />
            <input value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Subject" />
            <textarea value={form.body} onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))} className="min-h-24 rounded-xl border border-slate-300 px-3 py-2" placeholder="Body" />
          </>
        )}

        {type === "phone" && <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Phone number" />}

        {type === "sms" && (
          <>
            <input value={form.smsPhone} onChange={(e) => setForm((p) => ({ ...p, smsPhone: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="SMS number" />
            <input value={form.smsMessage} onChange={(e) => setForm((p) => ({ ...p, smsMessage: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Message" />
          </>
        )}

        {type === "wifi" && (
          <>
            <input value={form.wifiSsid} onChange={(e) => setForm((p) => ({ ...p, wifiSsid: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="WiFi SSID" />
            <input value={form.wifiPassword} onChange={(e) => setForm((p) => ({ ...p, wifiPassword: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Password" />
            <input value={form.wifiSecurity} onChange={(e) => setForm((p) => ({ ...p, wifiSecurity: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Security" />
          </>
        )}

        {type === "vcard" && (
          <>
            <input value={form.firstName} onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="First name" />
            <input value={form.lastName} onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Last name" />
            <input value={form.org} onChange={(e) => setForm((p) => ({ ...p, org: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Organization" />
            <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Title" />
            <input value={form.vcardEmail} onChange={(e) => setForm((p) => ({ ...p, vcardEmail: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Email" />
            <input value={form.vcardPhone} onChange={(e) => setForm((p) => ({ ...p, vcardPhone: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Phone" />
            <input value={form.vcardUrl} onChange={(e) => setForm((p) => ({ ...p, vcardUrl: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Website" />
            <input value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Address" />
          </>
        )}

        {type === "location" && (
          <>
            <input value={form.lat} onChange={(e) => setForm((p) => ({ ...p, lat: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Latitude" />
            <input value={form.lng} onChange={(e) => setForm((p) => ({ ...p, lng: e.target.value }))} className="h-11 rounded-xl border border-slate-300 px-3" placeholder="Longitude" />
          </>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Foreground Color</span>
            <div
                className="relative h-11 w-full rounded-2xl border border-slate-300"
                style={{ backgroundColor: fg }}
                >
                <input
                    type="color"
                    value={fg}
                    onChange={(e) => setFg(e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
            </div>
          
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Background Color</span>
            <div
                className="relative h-11 w-full rounded-2xl border border-slate-300"
                style={{ backgroundColor: bg }}
                >
                <input
                    type="color"
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
            </div>
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        <span className="font-medium">Logo Upload</span>
      </label>
      <div className="space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={(e) => onLogo(e.target.files?.[0])}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:border-blue-400/30 hover:bg-white/10"
          >
            <FileUp className="h-4 w-4 text-blue-300" />
          </button>
        </div>
        <CustomSelect
            label="Scan reliability"
            value={ecLevel}
            callBackTrigger = {(e) => setEcLevel(e as "L" | "M" | "Q" | "H")}
            options={[
                          { value: "L", label: "Low" },
                          { value: "M", label: "Medium" },
                          { value: "Q", label: "High" },
                          { value: "H", label: "Very high" },
                      ]}
            placeholder="Select mode"
        />
        <span className="text-xs text-slate-500">
            Higher reliability helps with logos and damage, but creates a denser QR code.
        </span>
                  
      
      <QRDownloadButtons
        format={format}
        onFormatChange={setFormat}
        onDownload={download}
        onOpenPreview={onOpenPreview}
        busy={busy}
        disabled={hasErrors}
      />
      
    </div>
  );
}

export const QRGeneratorPanel = memo(QRGeneratorPanelImpl);