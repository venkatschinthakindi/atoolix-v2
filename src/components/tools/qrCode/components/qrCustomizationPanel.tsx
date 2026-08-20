"use client";

import type {
  QrLabelFont,
  QrPresentationState,
} from "@/components/tools/qrCode/qrTypes";

type Props = {
  presentation: QrPresentationState;
  setPresentation: React.Dispatch<
    React.SetStateAction<QrPresentationState>
  >;
  onImage: (file?: File | null) => void;
};

const fonts: QrLabelFont[] = [
  "Inter",
  "Arial",
  "Helvetica",
  "Georgia",
  "Times New Roman",
  "Courier New",
];

export function QRCustomizationPanel({
  presentation,
  setPresentation,
  onImage,
}: Props) {
  const update = <K extends keyof QrPresentationState>(
    key: K,
    value: QrPresentationState[K]
  ) => {
    setPresentation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Customize QR Card
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Add a title, description, image, colors and
            fonts below your QR code.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={presentation.enabled}
          onClick={() =>
            update(
              "enabled",
              !presentation.enabled
            )
          }
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            presentation.enabled
              ? "bg-green-500"
              : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
              presentation.enabled
                ? "left-6"
                : "left-1"
            }`}
          />
        </button>
      </div>

      {!presentation.enabled ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
          Enable this option to add extra information
          below your QR code.
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          {/* Title */}

          <div>
            <label
              htmlFor="qr-card-title"
              className="mb-2 block text-xs font-medium text-slate-700"
            >
              Title
            </label>

            <input
              id="qr-card-title"
              type="text"
              value={presentation.title}
              onChange={(e) =>
                update(
                  "title",
                  e.target.value
                )
              }
              placeholder="Scan to visit our website"
              maxLength={120}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500"
            />

            <div className="mt-1 text-right text-[10px] text-slate-400">
              {presentation.title.length}/120
            </div>
          </div>

          {/* Description */}

          <div>
            <label
              htmlFor="qr-card-description"
              className="mb-2 block text-xs font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id="qr-card-description"
              value={presentation.description}
              onChange={(e) =>
                update(
                  "description",
                  e.target.value
                )
              }
              placeholder="Scan this code to learn more about our services."
              maxLength={500}
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500"
            />

            <div className="mt-1 text-right text-[10px] text-slate-400">
              {presentation.description.length}/500
            </div>
          </div>

          {/* Image */}

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-700">
              Image
            </label>

            {presentation.image ? (
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={presentation.image}
                    alt="QR card"
                    className="h-16 w-16 rounded-lg object-contain"
                  />

                  <div className="flex-1">
                    <p className="text-xs text-slate-600">
                      Image added
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        onImage(null)
                      }
                      className="mt-1 text-xs text-red-500 hover:text-red-600"
                    >
                      Remove image
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-4 py-5 text-center transition hover:border-indigo-400">
                <div>
                  <div className="text-sm text-slate-600">
                    Upload image
                  </div>

                  <div className="mt-1 text-[11px] text-slate-400">
                    PNG, JPG, WEBP · Max 5MB
                  </div>
                </div>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    onImage(
                      e.target.files?.[0] ||
                        null
                    );

                    e.currentTarget.value =
                      "";
                  }}
                />
              </label>
            )}
          </div>

          {/* Colors */}

          <div className="grid gap-4 sm:grid-cols-2">
            <ColorField
              label="Title color"
              value={presentation.titleColor}
              onChange={(value) =>
                update(
                  "titleColor",
                  value
                )
              }
            />

            <ColorField
              label="Description color"
              value={
                presentation.descriptionColor
              }
              onChange={(value) =>
                update(
                  "descriptionColor",
                  value
                )
              }
            />
          </div>

          <ColorField
            label="Card background"
            value={
              presentation.backgroundColor
            }
            onChange={(value) =>
              update(
                "backgroundColor",
                value
              )
            }
          />

          {/* Fonts */}

          <div className="grid gap-4 sm:grid-cols-2">
            <FontField
              label="Title font"
              value={
                presentation.titleFont
              }
              onChange={(value) =>
                update(
                  "titleFont",
                  value
                )
              }
            />

            <FontField
              label="Description font"
              value={
                presentation.descriptionFont
              }
              onChange={(value) =>
                update(
                  "descriptionFont",
                  value
                )
              }
            />
          </div>

          <button
            type="button"
            onClick={() =>
              setPresentation({
                enabled: true,
                title: "Atoolix QR Code",
                description: "Atoolix QR Code Generator",
                titleColor: "#111827",
                descriptionColor: "#4B5563",
                titleFont: "Inter",
                descriptionFont: "Inter",
                backgroundColor: "#FFFFFF",
                image: undefined,
              })
            }
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            Reset card customization
          </button>
        </div>
      )}
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-700">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="h-11 w-12 cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
        />

        <input
          type="text"
          value={value}
          onChange={(e) => {
            const next = e.target.value;

            if (
              next === "" ||
              /^#[0-9A-Fa-f]{0,6}$/.test(next)
            ) {
              onChange(next);
            }
          }}
          maxLength={7}
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
}

function FontField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: QrLabelFont;
  onChange: (value: QrLabelFont) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value as QrLabelFont
          )
        }
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500"
        style={{
          fontFamily: value,
        }}
      >
        {fonts.map((font) => (
          <option
            key={font}
            value={font}
          >
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}
