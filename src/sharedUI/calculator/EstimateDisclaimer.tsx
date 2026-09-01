interface EstimateDisclaimerProps {
  /** Override the default note text if a specific calculator ever needs to. */
  children?: React.ReactNode;
}

/**
 * The closing "Estimates only..." disclaimer, identical across all
 * savings calculators. Extracted verbatim.
 */
export function EstimateDisclaimer({ children }: EstimateDisclaimerProps) {
  return (
    <p className="text-center text-sm text-status-warning px-2">
      <b>Note: </b>
      {children ?? (
        <>
          Estimates only, based on standard interest formulas. Actual
          financial products may differ due to product terms, taxes,
          fees, or calculation methods. Confirm exact figures with your
          financial institution.
        </>
      )}
    </p>
  );
}
