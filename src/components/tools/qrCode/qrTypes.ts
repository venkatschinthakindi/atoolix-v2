export type TabKey = "generate" | "scanner";
export type QrType = "url" | "text" | "email" | "phone" | "sms" | "wifi" | "vcard" | "location";
export type PreviewVariant = "qr" | "scan";
export type ScanActionType = "url" | "email" | "phone" | "sms" | "geo" | "wifi" | "vcard" | "text";

export type QrFormState = {
  url: string;
  text: string;
  email: string;
  subject: string;
  body: string;
  phone: string;
  smsPhone: string;
  smsMessage: string;
  wifiSecurity: string;
  wifiSsid: string;
  wifiPassword: string;
  firstName: string;
  lastName: string;
  org: string;
  title: string;
  vcardPhone: string;
  vcardEmail: string;
  vcardUrl: string;
  address: string;
  lat: string;
  lng: string;
};

export type PreviewState = {
  open: boolean;
  url: string | null;
  variant: PreviewVariant;
  documentName: string;
};

/* NEW */

export type QrLabelFont =
  | "Inter"
  | "Arial"
  | "Helvetica"
  | "Georgia"
  | "Times New Roman"
  | "Courier New";

export type QrPresentationState = {
  enabled: boolean;

  title: string;
  description: string;

  titleColor: string;
  descriptionColor: string;

  titleFont: QrLabelFont;
  descriptionFont: QrLabelFont;

  backgroundColor: string;

  image?: string;
};