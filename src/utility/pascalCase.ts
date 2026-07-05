declare global {
  interface String {
    toPascalCase(): string;
  }
}

String.prototype.toPascalCase = function (): string {
  return this
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export {};
