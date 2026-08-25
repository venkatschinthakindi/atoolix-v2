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

## Latest network verification

The latest public-IP verification explicitly confirms the client is still on Hathway:

- Public IPv4: `27.6.13.114`
- Hostname: `13.6.27.114.hathway.com`
- ASN/ISP: `AS17488 Hathway IP Over Cable Internet`
- Location: Hyderabad, Telangana, India

Therefore the latest forced-IP comparison is **another Hathway measurement**, not an independent-ISP test. The independent-network isolation remains open.

## Latest controlled forced-IP evidence

### `104.21.96.81`

10 forced-IP HTTPS requests to `/cdn-cgi/trace`:

- 10/10 HTTP 200.
- Connect: approximately `46–55 ms`.
- TLS: approximately `106–255 ms`, with some elevated samples.
- TTFB: mostly `155–355 ms`; two notable outliers around `0.405 s` and `0.721 s`.
- Typical requests remain approximately `0.15–0.20 s`.

### `172.67.175.84`

10 forced-IP HTTPS requests:

- 8/10 HTTP 200.
- 2/10 connection timeouts at ~5 seconds (`code=000`, `connect=0`).
- Successful connect: approximately `127–152 ms`.
- TLS: approximately `264–307 ms` in normal successful samples.
- TTFB: approximately `388–450 ms` in normal successful samples.
- The two failed requests never established TCP (`connect=0`), so their delay is not a TLS handshake delay.

This strengthens the conclusion that the problem is **upstream of TLS on the failing attempts**, because some `172.67` requests fail before TCP connection establishment.

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

**Do not make a Cloudflare production change yet.** The next decisive step remains a genuinely independent network measurement.

Use:

1. Phone/mobile hotspot with Wi-Fi disconnected from the Hathway connection.
2. A second broadband ISP.
3. A remote test machine/server on another network.

First verify the external/public IP and ISP on that network. It must not show `AS17488 Hathway`. Then repeat the same forced-IP HTTPS test against both `104.21.96.81` and `172.67.175.84`.

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
Public network:
27.6.13.114 — AS17488 Hathway — NOT independent

Latest Hathway forced-IP sample:
104.21.96.81 — 10/10 successful, mostly ~0.15–0.20 s
172.67.175.84 — 8/10 successful, 2/10 TCP connection timeouts, successful requests ~0.39–0.45 s

Conclusion:
- IP-specific degradation remains reproducible.
- Failed 172.67 requests can fail before TCP establishment, so this is not simply TLS configuration overhead.
- Independent-ISP isolation is NOT yet proven.
- Next: verify a genuinely different ISP/network, then repeat the two forced-IP tests.
```