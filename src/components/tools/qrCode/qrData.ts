import { QrFormState, QrType } from "@/components/tools/qrCode/qrTypes";
import { escapeVCardText, escapeWifiText } from "@/components/tools/qrCode/qrUtils";

export const defaultQrForm: QrFormState = {
  url: "https://AToolix.com",
  text: "Hello from AToolix",
  email: "support@AToolix.com",
  subject: "Hello",
  body: "Message body",
  phone: "+91",
  smsPhone: "+91",
  smsMessage: "Hi",
  wifiSecurity: "WPA",
  wifiSsid: "MyWiFi",
  wifiPassword: "password",
  firstName: "AToolix",
  lastName: "AToolix",
  org: "AToolix",
  title: "Founder",
  vcardPhone: "+91",
  vcardEmail: "support@AToolix.com",
  vcardUrl: "https://AToolix.com",
  address: "Hyderabad, Telangana",
  lat: "17.3850",
  lng: "78.4867",
};

export function buildPayload(type: QrType, form: QrFormState) {
  switch (type) {
    case "url":
      return form.url;
    case "text":
      return form.text;
    case "email":
      return `mailto:${form.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.body)}`;
    case "phone":
      return `tel:${form.phone}`;
    case "sms":
      return `SMSTO:${form.smsPhone}:${form.smsMessage}`;
    case "wifi":
      return `WIFI:T:${escapeWifiText(form.wifiSecurity)};S:${escapeWifiText(form.wifiSsid)};P:${escapeWifiText(form.wifiPassword)};;`;
    case "vcard": {
      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escapeVCardText(form.lastName)};${escapeVCardText(form.firstName)};;;`,
        `FN:${escapeVCardText(`${form.firstName} ${form.lastName}`)}`,
        form.org ? `ORG:${escapeVCardText(form.org)}` : "",
        form.title ? `TITLE:${escapeVCardText(form.title)}` : "",
        form.vcardPhone ? `TEL:${escapeVCardText(form.vcardPhone)}` : "",
        form.vcardEmail ? `EMAIL:${escapeVCardText(form.vcardEmail)}` : "",
        form.vcardUrl ? `URL:${escapeVCardText(form.vcardUrl)}` : "",
        form.address ? `ADR:;;${escapeVCardText(form.address)};;;;` : "",
        "END:VCARD",
      ].filter(Boolean);
      return lines.join("\n");
    }
    case "location":
      return `geo:${form.lat},${form.lng}`;
    default:
      return "";
  }
}