import dynamic from "next/dynamic";

const QRToolsClient = dynamic(() => import("@/components/tools/qrCode/qrToolsClient"), {
  ssr: false,
});

export default function QRPage() {
  return <QRToolsClient />;
}