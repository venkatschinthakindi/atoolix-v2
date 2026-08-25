# Cloudflare Anycast / Client-Edge Latency Audit — 2026-08-25

## Status

**No production configuration changes made.**

The caching fix remains correct and is not being modified:

- `Cache-Control: max-age=14400, s-maxage=31536000`
- `CF-Cache-Status: HIT`
- Origin/local Nginx timing previously measured at approximately 28–36 ms.
- The remaining latency is therefore being investigated as a client → Cloudflare edge/path issue.

## Current diagnosis

The evidence continues to point to **Hathway/ISP → Cloudflare Anycast path selection or peering**, not the Atoolix origin, Nginx, application cache, or a general TLS configuration defect.

## Independent-network comparison

The latest test was intended to be the decisive independent-ISP comparison. However, the output itself is **materially identical to the previous Hathway baseline**: `104.21.96.81` is healthy while `172.67.175.84` remains substantially slower and intermittently unreachable.

Because the reported output does not identify or prove that the connection was actually switched to a different ISP/network, this result **must not be classified as an independent-network confirmation**. It is valid as another controlled forced-IP observation, but the ISP-isolation question remains open.

Latest 10-request sample:

### `104.21.96.81`

- 10/10 HTTP 200.
- Connect: approximately `46–72 ms`.
- TLS: approximately `102–244 ms` in the sample.
- TTFB: mostly `149–202 ms`; one `0.649 s` outlier.
- Typical successful requests remain around `0.15–0.20 s`.

### `172.67.175.84`

- 8/10 HTTP 200.
- 2/10 connection timeouts at ~5 seconds (`code=000`, `connect=0`).
- Successful connect: approximately `118–141 ms`.
- TLS: approximately `251–886 ms`.
- TTFB: mostly `371–402 ms`, with requests 6–7 reaching approximately `0.923–1.024 s`.
- This remains materially worse than `104.21.96.81`.

## Route/path evidence

The same Hathway traces previously showed materially different paths:

### `104.21.96.81`

```text
Hathway
  ↓
103.198.140.170        ~14–16 ms
  ↓
103.198.140.209        ~47–48 ms
  ↓
Cloudflare path         ~47–65 ms
  ↓
104.21.96.81            ~47 ms
```

### `172.67.175.84`

```text
Hathway
  ↓
103.198.140.174        ~22–28 ms
  ↓
103.198.140.54         ~123–128 ms
  ↓
149.6.154.130          ~120–126 ms
  ↓
162.158.20.53          ~120–140 ms
  ↓
172.67.175.84           no traceroute response
```

The route divergence remains the strongest explanation for the IP-specific behavior.

## Pathping limitation

The earlier `pathping` runs did not reach the destination and therefore do not establish end-to-end packet loss. The `100%` ICMP response loss at `115.98.82.1` is contradicted by downstream responding hops and should be treated as ICMP filtering/suppression.

## What is next

**Do not make a Cloudflare production change yet.** The next decisive step is to obtain a genuinely independent network measurement.

Use one of:

1. Phone/mobile hotspot with Wi-Fi disconnected from the Hathway connection.
2. A second broadband ISP.
3. A remote test machine/server on another network.

First verify the external/public IP and ISP on that network, then run the same forced-IP test against both Cloudflare addresses. The verification matters because the latest output cannot prove that the network actually changed.

Interpretation after verified ISP change:

- **Both IPs become healthy:** strong evidence for Hathway-specific routing/peering.
- **172.67 remains degraded while 104.21 remains healthy:** evidence shifts toward a broader Cloudflare Anycast/prefix/path issue.
- **Both become degraded:** investigate the new network's path or broader Internet conditions.

## Important conclusion

Do **not** change:

- Cloudflare Cache Rules
- Cache-Control headers
- Nginx caching configuration
- Next.js caching/prerendering
- origin server configuration
- TLS configuration

until the client-edge path is isolated further.

## Evidence snapshot

```text
Previous Hathway baseline:
104.21.96.81 — 20/20 successful, typically ~0.15–0.21 s
172.67.175.84 — 14/20 successful, 6 connection timeouts, typically ~0.37–0.44 s

Latest sample (network identity not independently verified):
104.21.96.81 — 10/10 successful, mostly ~0.15–0.20 s, one ~0.649 s outlier
172.67.175.84 — 8/10 successful, 2 connection timeouts, mostly ~0.37–0.40 s

Conclusion:
- IP-specific degradation remains reproducible.
- Independent-ISP isolation is NOT yet proven.
- Next: verify a genuinely different ISP/network, then repeat the two forced-IP tests.
```