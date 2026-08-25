# Cloudflare Anycast / Client-Edge Latency Audit — 2026-08-25

## Status

**No production configuration changes made.**

The caching fix remains correct and is not being modified:

- `Cache-Control: max-age=14400, s-maxage=31536000`
- `CF-Cache-Status: HIT`
- Origin/local Nginx timing previously measured at approximately 28–36 ms.
- The remaining latency is therefore being investigated as a client → Cloudflare edge/path issue.

## Latest controlled evidence

### Cloudflare IPv4 `104.21.96.81`

20 forced-IP HTTPS requests to `/cdn-cgi/trace` using `--resolve atoolix.com:443:104.21.96.81`:

- TCP connect: approximately `45–73 ms` in normal samples.
- TLS completion: mostly `103–153 ms`.
- TTFB: mostly `151–214 ms`.
- One TLS/TTFB outlier: request 5, TLS `0.606 s`, TTFB `0.812 s`.
- All 20 requests completed successfully with HTTP 200.
- Typical total time is approximately `0.15–0.21 s`.

### Cloudflare IPv4 `172.67.175.84`

20 forced-IP HTTPS requests to `/cdn-cgi/trace` using `--resolve atoolix.com:443:172.67.175.84`:

- Successful TCP connect: approximately `120–150 ms`.
- TLS completion: approximately `248–300 ms`.
- TTFB: approximately `368–442 ms`.
- 6 of 20 requests timed out at the 5-second connection timeout (`code=000`, `connect=0`).
- Successful requests consistently take roughly `0.37–0.44 s`.

## Interpretation

This is strong evidence that the remaining latency is **not an origin/Nginx/cache-generation problem**.

The same hostname and same Cloudflare service show materially different behavior depending on the Cloudflare Anycast destination IP:

`104.21.96.81` → normally ~150–210 ms total

`172.67.175.84` → normally ~370–440 ms total + repeated TCP connection failures

The earlier route evidence also showed instability on the Hathway/ISP path before Cloudflare, including elevated latency/jitter at `103.198.140.209` and packet loss/jitter at `103.198.140.170`.

The `/cdn-cgi/trace` output identified the active Cloudflare colo as `SIN` for the normal path. Therefore the current investigation is specifically focused on **ISP → Cloudflare Anycast routing / edge selection / path quality**, not on production cache or origin configuration.

## Important conclusion

Do **not** change:

- Cloudflare Cache Rules
- Cache-Control headers
- Nginx caching configuration
- Next.js caching/prerendering
- origin server configuration

until the client-edge path is isolated further.

## Next investigation

1. Compare Cloudflare Anycast paths for `104.21.96.81` and `172.67.175.84` using repeated route measurements.
2. Correlate the forced-IP results with `/cdn-cgi/trace` `colo` output.
3. Determine whether the bad behavior is specific to the `172.67.175.84` path/prefix or reflects broader ISP-to-Cloudflare routing instability.
4. If possible, compare from another network/ISP to distinguish local Hathway routing from Cloudflare-side behavior.
5. Only after this evidence is established should any Cloudflare routing/traffic-steering option be considered.

## Evidence snapshot

```text
104.21.96.81 — 20/20 successful
Typical connect: ~0.045–0.073 s
Typical TLS:     ~0.103–0.153 s
Typical TTFB:    ~0.151–0.214 s
One outlier:     TTFB ~0.812 s

172.67.175.84 — 14/20 successful, 6/20 connection timeouts
Successful connect: ~0.120–0.150 s
Successful TLS:     ~0.248–0.300 s
Successful TTFB:    ~0.368–0.442 s
Failures:           5 s connection timeout, connect=0
```
