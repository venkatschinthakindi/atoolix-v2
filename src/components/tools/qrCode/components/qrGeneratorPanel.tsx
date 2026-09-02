"use client";

import type { Dispatch, SetStateAction } from "react";
import type {
  QrFormState,
  QrLabelFont,
  QrPresentationState,
  QrType,
} from "@/components/tools/qrCode/qrTypes";

type Props = {
  type: QrType;
  setType: Dispatch<SetStateAction<QrType>>;

  form: QrFormState;
  setForm: Dispatch<SetStateAction<QrFormState>>;

  fg: string;
  setFg: Dispatch<SetStateAction<string>>;

  bg: string;
  setBg: Dispatch<SetStateAction<string>>;

  size: number;
  setSize: Dispatch<SetStateAction<number>>;

  ecLevel: "L" | "M" | "Q" | "H";
  setEcLevel: Dispatch<SetStateAction<"L" | "M" | "Q" | "H">>;

  onLogo: (file?: File | null) => void;

  presentation: QrPresentationState;
  setPresentation: Dispatch<SetStateAction<QrPresentationState>>;
  onPresentationImage: (file?: File | null) => void;

  onOpenPreview: () => void;
  onPng: () => void;
  onSvg: () => void;
  onPdf: () => void;

  busy: boolean;
  hasErrors: boolean;
};

const inputClass =
  "w-full rounded-xl border border-border bg-surface-sunken px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-green-400";

const labelClass =
  "mb-2 block text-sm font-medium text-foreground-secondary";

const selectClass =
  "w-full rounded-xl border border-border bg-surface-sunken px-4 py-3 text-foreground outline-none focus:border-green-400";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

export function QRGeneratorPanel({
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
  presentation,
  setPresentation,
  onPresentationImage,
  onOpenPreview,
  onPng,
  onSvg,
  onPdf,
  busy,
  hasErrors,
}: Props) {
  const updateForm = <K extends keyof QrFormState>(
    key: K,
    value: QrFormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updatePresentation = <
    K extends keyof QrPresentationState
  >(
    key: K,
    value: QrPresentationState[K]
  ) => {
    setPresentation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">

      {/* =========================================================
          QR TYPE
      ========================================================= */}
      <section className="rounded-2xl border border-border bg-surface-sunken p-4">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          QR Code Type
        </h2>

        <Field label="What do you want to encode?">
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as QrType)
            }
            className={selectClass}
          >
            <option value="url">Website URL</option>
            <option value="text">Plain Text</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="sms">SMS</option>
            <option value="wifi">Wi-Fi</option>
            <option value="vcard">Contact / vCard</option>
            <option value="location">Location</option>
          </select>
        </Field>
      </section>

      {/* =========================================================
          TYPE-SPECIFIC INFORMATION
      ========================================================= */}
      <section className="rounded-2xl border border-border bg-surface-sunken p-4">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Information
        </h2>

        <div className="space-y-4">

          {/* URL */}
          {type === "url" && (
            <Field label="Website URL">
              <input
                type="url"
                value={form.url}
                onChange={(e) =>
                  updateForm("url", e.target.value)
                }
                placeholder="https://example.com"
                className={inputClass}
              />
            </Field>
          )}

          {/* TEXT */}
          {type === "text" && (
            <Field label="Text">
              <textarea
                value={form.text}
                onChange={(e) =>
                  updateForm("text", e.target.value)
                }
                placeholder="Enter your text"
                rows={5}
                className={inputClass}
              />
            </Field>
          )}

          {/* EMAIL */}
          {type === "email" && (
            <>
              <Field label="Email Address">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    updateForm("email", e.target.value)
                  }
                  placeholder="hello@example.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Subject">
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    updateForm("subject", e.target.value)
                  }
                  placeholder="Email subject"
                  className={inputClass}
                />
              </Field>

              <Field label="Message">
                <textarea
                  value={form.body}
                  onChange={(e) =>
                    updateForm("body", e.target.value)
                  }
                  placeholder="Email message"
                  rows={5}
                  className={inputClass}
                />
              </Field>
            </>
          )}

          {/* PHONE */}
          {type === "phone" && (
            <Field label="Phone Number">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  updateForm("phone", e.target.value)
                }
                placeholder="+1 555 123 4567"
                className={inputClass}
              />
            </Field>
          )}

          {/* SMS */}
          {type === "sms" && (
            <>
              <Field label="Phone Number">
                <input
                  type="tel"
                  value={form.smsPhone}
                  onChange={(e) =>
                    updateForm("smsPhone", e.target.value)
                  }
                  placeholder="+1 555 123 4567"
                  className={inputClass}
                />
              </Field>

              <Field label="SMS Message">
                <textarea
                  value={form.smsMessage}
                  onChange={(e) =>
                    updateForm("smsMessage", e.target.value)
                  }
                  placeholder="Enter SMS message"
                  rows={4}
                  className={inputClass}
                />
              </Field>
            </>
          )}

          {/* WIFI */}
          {type === "wifi" && (
            <>
              <Field label="Wi-Fi Network Name (SSID)">
                <input
                  type="text"
                  value={form.wifiSsid}
                  onChange={(e) =>
                    updateForm("wifiSsid", e.target.value)
                  }
                  placeholder="My Wi-Fi"
                  className={inputClass}
                />
              </Field>

              <Field label="Security">
                <select
                  value={form.wifiSecurity}
                  onChange={(e) =>
                    updateForm(
                      "wifiSecurity",
                      e.target.value
                    )
                  }
                  className={selectClass}
                >
                  <option value="WPA">WPA</option>
                  <option value="WPA2">WPA2</option>
                  <option value="WPA3">WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">
                    No Password
                  </option>
                </select>
              </Field>

              {form.wifiSecurity !== "nopass" && (
                <Field label="Wi-Fi Password">
                  <input
                    type="password"
                    value={form.wifiPassword}
                    onChange={(e) =>
                      updateForm(
                        "wifiPassword",
                        e.target.value
                      )
                    }
                    placeholder="Wi-Fi password"
                    className={inputClass}
                  />
                </Field>
              )}
            </>
          )}

          {/* VCARD */}
          {type === "vcard" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First Name">
                <input
                  value={form.firstName}
                  onChange={(e) =>
                    updateForm(
                      "firstName",
                      e.target.value
                    )
                  }
                  placeholder="John"
                  className={inputClass}
                />
              </Field>

              <Field label="Last Name">
                <input
                  value={form.lastName}
                  onChange={(e) =>
                    updateForm(
                      "lastName",
                      e.target.value
                    )
                  }
                  placeholder="Doe"
                  className={inputClass}
                />
              </Field>

              <Field label="Organization">
                <input
                  value={form.org}
                  onChange={(e) =>
                    updateForm("org", e.target.value)
                  }
                  placeholder="Company"
                  className={inputClass}
                />
              </Field>

              <Field label="Job Title">
                <input
                  value={form.title}
                  onChange={(e) =>
                    updateForm("title", e.target.value)
                  }
                  placeholder="Manager"
                  className={inputClass}
                />
              </Field>

              <Field label="Phone">
                <input
                  type="tel"
                  value={form.vcardPhone}
                  onChange={(e) =>
                    updateForm(
                      "vcardPhone",
                      e.target.value
                    )
                  }
                  placeholder="+1 555 123 4567"
                  className={inputClass}
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  value={form.vcardEmail}
                  onChange={(e) =>
                    updateForm(
                      "vcardEmail",
                      e.target.value
                    )
                  }
                  placeholder="john@example.com"
                  className={inputClass}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Website">
                  <input
                    type="url"
                    value={form.vcardUrl}
                    onChange={(e) =>
                      updateForm(
                        "vcardUrl",
                        e.target.value
                      )
                    }
                    placeholder="https://example.com"
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>
          )}

          {/* LOCATION */}
          {type === "location" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Latitude">
                <input
                  type="text"
                  value={form.lat}
                  onChange={(e) =>
                    updateForm("lat", e.target.value)
                  }
                  placeholder="40.7128"
                  className={inputClass}
                />
              </Field>

              <Field label="Longitude">
                <input
                  type="text"
                  value={form.lng}
                  onChange={(e) =>
                    updateForm("lng", e.target.value)
                  }
                  placeholder="-74.0060"
                  className={inputClass}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Address">
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) =>
                      updateForm(
                        "address",
                        e.target.value
                      )
                    }
                    placeholder="Optional address"
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          BASIC QR OPTIONS
      ========================================================= */}
      <section className="rounded-2xl border border-border bg-surface-sunken p-4">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          QR Options
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">

          {/* FOREGROUND */}
          <Field label="QR Color">
            <div className="flex gap-2">
              <input
                type="color"
                value={fg}
                onChange={(e) =>
                  setFg(e.target.value)
                }
                className="h-12 w-14 cursor-pointer rounded-lg border border-border bg-transparent"
              />

              <input
                type="text"
                value={fg}
                onChange={(e) =>
                  setFg(e.target.value)
                }
                className={inputClass}
              />
            </div>
          </Field>

          {/* BACKGROUND */}
          <Field label="Background Color">
            <div className="flex gap-2">
              <input
                type="color"
                value={bg}
                onChange={(e) =>
                  setBg(e.target.value)
                }
                className="h-12 w-14 cursor-pointer rounded-lg border border-border bg-transparent"
              />

              <input
                type="text"
                value={bg}
                onChange={(e) =>
                  setBg(e.target.value)
                }
                className={inputClass}
              />
            </div>
          </Field>

          {/* SIZE */}
          <Field label={`QR Size: ${size}px`}>
            <input
              type="range"
              min={128}
              max={1024}
              step={8}
              value={size}
              onChange={(e) =>
                setSize(Number(e.target.value))
              }
              className="w-full accent-green-500"
            />
          </Field>

          {/* ERROR CORRECTION */}
          <Field label="Error Correction">
            <select
              value={ecLevel}
              onChange={(e) =>
                setEcLevel(
                  e.target.value as "L" | "M" | "Q" | "H"
                )
              }
              className={selectClass}
            >
              <option value="L">
                Low — 7%
              </option>
              <option value="M">
                Medium — 15%
              </option>
              <option value="Q">
                Quartile — 25%
              </option>
              <option value="H">
                High — 30%
              </option>
            </select>
          </Field>
        </div>
      </section>

      {/* =========================================================
          LOGO
      ========================================================= */}
      <section className="rounded-2xl border border-border bg-surface-sunken p-4">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          QR Logo
        </h2>

        <label className="block">
          <span className={labelClass}>
            Upload Logo
          </span>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={(e) =>
              onLogo(e.target.files?.[0] ?? null)
            }
            className="block w-full rounded-xl border border-border bg-surface-sunken p-3 text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-green-500 file:px-4 file:py-2 file:font-medium file:text-slate-900"
          />
        </label>

        <p className="mt-2 text-xs text-muted-foreground">
          PNG, JPG, WEBP or SVG. Maximum 2MB.
        </p>
      </section>

      {/* =========================================================
          PRESENTATION
      ========================================================= */}
      <section className="rounded-2xl border border-border bg-surface-sunken p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Presentation
            </h2>
            <p className="text-xs text-muted-foreground">
              Add a title, description and image around the QR code.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              updatePresentation(
                "enabled",
                !presentation.enabled
              )
            }
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              presentation.enabled
                ? "bg-green-500 text-slate-900"
                : "bg-surface-raised text-foreground"
            }`}
          >
            {presentation.enabled
              ? "Enabled"
              : "Disabled"}
          </button>
        </div>

        {presentation.enabled && (
          <div className="space-y-4">

            <Field label="Title">
              <input
                value={presentation.title}
                onChange={(e) =>
                  updatePresentation(
                    "title",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </Field>

            <Field label="Description">
              <textarea
                value={presentation.description}
                onChange={(e) =>
                  updatePresentation(
                    "description",
                    e.target.value
                  )
                }
                rows={3}
                className={inputClass}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title Color">
                <input
                  type="color"
                  value={presentation.titleColor}
                  onChange={(e) =>
                    updatePresentation(
                      "titleColor",
                      e.target.value
                    )
                  }
                  className="h-12 w-full rounded-xl"
                />
              </Field>

              <Field label="Description Color">
                <input
                  type="color"
                  value={presentation.descriptionColor}
                  onChange={(e) =>
                    updatePresentation(
                      "descriptionColor",
                      e.target.value
                    )
                  }
                  className="h-12 w-full rounded-xl"
                />
              </Field>

              <Field label="Title Font">
                <select
                  value={presentation.titleFont}
                  onChange={(e) =>
                    updatePresentation(
                      "titleFont",
                      e.target.value as QrLabelFont
                    )
                  }
                  className={selectClass}
                >
                  <option value="Inter">Inter</option>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">
                    Helvetica
                  </option>
                  <option value="Georgia">
                    Georgia
                  </option>
                  <option value="Times New Roman">
                    Times New Roman
                  </option>
                </select>
              </Field>

              <Field label="Description Font">
                <select
                  value={presentation.descriptionFont}
                  onChange={(e) =>
                    updatePresentation(
                      "descriptionFont",
                      e.target.value as QrLabelFont
                    )
                  }
                  className={selectClass}
                >
                  <option value="Inter">Inter</option>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">
                    Helvetica
                  </option>
                  <option value="Georgia">
                    Georgia
                  </option>
                  <option value="Times New Roman">
                    Times New Roman
                  </option>
                </select>
              </Field>
            </div>

            <Field label="Presentation Background">
              <input
                type="color"
                value={presentation.backgroundColor}
                onChange={(e) =>
                  updatePresentation(
                    "backgroundColor",
                    e.target.value
                  )
                }
                className="h-12 w-full rounded-xl"
              />
            </Field>

            <Field label="Presentation Image">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) =>
                  onPresentationImage(
                    e.target.files?.[0] ?? null
                  )
                }
                className="block w-full rounded-xl border border-border bg-surface-sunken p-3 text-sm text-foreground"
              />
            </Field>
          </div>
        )}
      </section>

      {/* =========================================================
          ACTIONS
      ========================================================= */}
      <div className="grid gap-3 sm:grid-cols-4">
        <button
          type="button"
          onClick={onOpenPreview}
          disabled={busy || hasErrors}
          className="rounded-xl bg-surface-raised px-4 py-3 font-medium text-foreground transition hover:bg-foreground/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Preview
        </button>

        <button
          type="button"
          onClick={onPng}
          disabled={busy || hasErrors}
          className="rounded-xl bg-green-500 px-4 py-3 font-semibold text-slate-900 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? "Exporting..." : "PNG"}
        </button>

        <button
          type="button"
          onClick={onSvg}
          disabled={busy || hasErrors}
          className="rounded-xl bg-surface-raised px-4 py-3 font-medium text-foreground transition hover:bg-foreground/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          SVG
        </button>

        <button
          type="button"
          onClick={onPdf}
          disabled={busy || hasErrors}
          className="rounded-xl bg-surface-raised px-4 py-3 font-medium text-foreground transition hover:bg-foreground/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          PDF
        </button>
      </div>

      {hasErrors && (
        <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
          Please complete the required information above before exporting.
        </div>
      )}
    </div>
  );
}
