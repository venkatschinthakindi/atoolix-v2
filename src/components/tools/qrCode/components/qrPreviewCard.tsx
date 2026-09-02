"use client";

import { memo, RefObject } from "react";

import type {
  QrPresentationState,
} from "@/components/tools/qrCode/qrTypes";

type Props = {
  refEl: RefObject<HTMLDivElement | null>;
  onOpenModal: () => void;
  loading?: boolean;
  presentation: QrPresentationState;
};

function QRPreviewCardImpl({
  refEl,
  onOpenModal,
  loading,
  presentation,
}: Props) {
  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6 max-h-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Live Preview
        </h2>

        <button
          onClick={onOpenModal}
          aria-label="Open QR preview modal"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          Preview
        </button>
      </div>

      <div className="relative min-h-[420px] overflow-auto rounded-2xl bg-surface-sunken p-4 flex min-h-[380px] items-center justify-center">
          <div
            className="w-full max-w-[380px] overflow-hidden rounded-2xl shadow-sm"
            style={{
              backgroundColor:
                presentation.enabled
                  ? presentation.backgroundColor
                  : "#ffffff",
            }}
          >
            <div className="flex flex-col items-center p-5">
              {/* QR */}
              <div className="flex justify-center">
                <div ref={refEl} />
              </div>

              {/* Optional presentation content */}
              {presentation.enabled && (
                <div className="w-full text-center">
                  {presentation.image && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={presentation.image}
                        alt=""
                        className="max-h-24 max-w-[180px] rounded-lg object-contain"
                      />
                    </div>
                  )}

                  {presentation.title && (
                    <h3
                      className="mt-4 break-words text-xl font-bold"
                      style={{
                        color: presentation.titleColor,
                        fontFamily:
                          presentation.titleFont,
                      }}
                    >
                      {presentation.title}
                    </h3>
                  )}

                  {presentation.description && (
                    <p
                      className="mt-2 whitespace-pre-wrap break-words text-sm leading-6"
                      style={{
                        color:
                          presentation.descriptionColor,
                        fontFamily:
                          presentation.descriptionFont,
                      }}
                    >
                      {presentation.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

      {loading && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Loading...
        </p>
      )}
    </div>
  );
}

export const QRPreviewCard = memo(QRPreviewCardImpl);
