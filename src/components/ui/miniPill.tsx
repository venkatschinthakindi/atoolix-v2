// export function MiniPill({
//   label,
//   active,
//   onClick,
// }: {
//   label: string;
//   active: boolean;
//   onClick?: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={[
//         "rounded-full border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition hover:border-blue-400/30 hover:bg-white/10",
//         active
//           ? "border-blue-400/20 bg-blue-400/10 text-blue-200"
//           : "text-white/60",
//       ].join(" ")}
//     >
//       {label}
//     </button>
//   );
// }