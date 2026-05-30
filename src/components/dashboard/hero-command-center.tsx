// "use client";
// import { motion } from "framer-motion";
// export function HeroCommandCenter() {
//   return (
//     <motion.section
//   initial={{
//     opacity: 0,
//     y: 20,
//   }}
//   animate={{
//     opacity: 1,
//     y: 0,
//   }}
//   transition={{
//     duration: 0.6,
//   }}
// >
//     <section
//       className="
//         mx-auto
//         flex
//         max-w-6xl
//         flex-col
//         items-center
//         pt-40
//         text-center
//       "
//     >
//       <span
//         className="
//           glass
//           mb-6
//           px-4
//           py-2
//           text-sm
//           text-white/70
//         "
//       >
//         100+ Productivity Tools
//       </span>

//      <h1
//   className="
//     display-xl
//     gradient-text
//     max-w-5xl
//   "
// >
//         Find the perfect tool
//         for every task
//       </h1>

//       <p
//         className="
//           mt-6
//           max-w-2xl
//           text-lg
//           text-white/60
//         "
//       >
//         One platform for calculators,
//         PDF tools, AI utilities,
//         finance tools and more.
//       </p>
//       <div className="mt-10 w-full max-w-2xl">
//  <div
//   className="
//     glass
//     flex
//     items-center
//     gap-3
//     px-6
//     py-5
//   "
// >
//     <input
//       placeholder="Search tools..."
//       className="
//         w-full
//         bg-transparent
//         text-white
//         outline-none
//       "
//     />
//   </div>
// </div>
// <div
//   className="
//     mt-8
//     flex
//     flex-wrap
//     justify-center
//     gap-3
//   "
// >
//   {[
//     "Calculator",
//     "PDF",
//     "Finance",
//     "AI",
//     "Image",
//     "Developer",
//   ].map((item) => (
//     <div
//       key={item}
//       className="
//         glass
//         px-4
//         py-2
//         text-sm
//         text-white/70
//       "
//     >
//       {item}
//     </div>
//   ))}
// </div>
//     </section>
//     </motion.section>
//   );
// }
"use client";

import { motion } from "framer-motion";

export function HeroCommandCenter() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto flex max-w-6xl flex-col items-center pt-40 text-center"
    >
      <span className="glass mb-6 px-4 py-2 text-sm text-white/70">
        100+ Productivity Tools
      </span>

      <h1 className="display-xl gradient-text max-w-5xl">
        Find the perfect tool for every task
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-white/60">
        One platform for calculators, PDF tools, AI utilities, finance tools and more.
      </p>

      <div className="mt-10 w-full max-w-2xl">
        <div className="glass flex items-center gap-3 px-6 py-5">
          <input
            placeholder="Search tools..."
            className="w-full bg-transparent text-white outline-none"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {["Calculator", "PDF", "Finance", "AI", "Image", "Developer"].map(
          (item) => (
            <div
              key={item}
              className="glass px-4 py-2 text-sm text-white/70"
            >
              {item}
            </div>
          )
        )}
      </div>
    </motion.section>
  );
}