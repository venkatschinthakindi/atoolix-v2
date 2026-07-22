"use client";

import { useEffect, useMemo, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { QrFormState, QrType } from "@/components/tools/qrCode/qrTypes";
import { buildPayload } from "@/components/tools/qrCode/qrData";

type Args = {
  type: QrType;
  form: QrFormState;
  fg: string;
  bg: string;
  size: number;
  ecLevel: "L" | "M" | "Q" | "H";
  logo?: string;
};

type StyledOptions = ConstructorParameters<typeof QRCodeStyling>[0];

export function useQrCode({ type, form, fg, bg, size, ecLevel, logo }: Args) {
  const ref = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<QRCodeStyling | null>(null);
  const frameRef = useRef<number | null>(null);

  const payload = useMemo(() => buildPayload(type, form), [type, form]);

  useEffect(() => {
    if (!ref.current) return;

    const options: StyledOptions = {
      width: size,
      height: size,
      type: "svg",
      data: payload || " ",
      image: logo,
      margin: 12,
      qrOptions: { errorCorrectionLevel: ecLevel },
      dotsOptions: { color: fg, type: "classy-rounded" },
      cornersSquareOptions: { type: "extra-rounded" },
      cornersDotOptions: { type: "dot" },
      backgroundOptions: { color: bg },
      imageOptions: {
        margin: 6,
        hideBackgroundDots: true,
        imageSize: 0.22,
      },
    };

    if (!instanceRef.current) {
      instanceRef.current = new QRCodeStyling(options);
      ref.current.innerHTML = "";
      instanceRef.current.append(ref.current);
    } else {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        ref.current?.innerHTML;
        if(!!ref.current?.innerHTML) {
          ref.current.innerHTML = "";
        }
        instanceRef.current = new QRCodeStyling(options);
        if(!!ref.current) {
          instanceRef.current.append(ref.current);
        }
      });
    }

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [payload, fg, bg, size, ecLevel, logo]);

  useEffect(() => {
    return () => {
      instanceRef.current = null;
    };
  }, []);

  return { ref, instanceRef, payload };
}