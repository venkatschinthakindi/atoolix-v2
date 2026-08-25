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

## Route/path evidence

Fresh `tracert -4` measurements show that the two Cloudflare anycast destinations take materially different upstream paths from the same Hathway connection.

### `104.21.96.81` path

```text
Hathway
  ↓
103.198.140.170        ~14–16 ms
  ↓
103.198.140.209        ~47–48 ms (one 178 ms sample)
  ↓
162.158.160.241        ~48–65 ms
  ↓
172.69.117.39           ~47–48 ms
  ↓
172.69.117.93           ~47–56 ms
  ↓
104.21.96.81            ~47 ms
```

### `172.67.175.84` path

```text
Hathway
  ↓
103.198.140.174        ~22–28 ms
  ↓
103.198.140.54         ~123–128 ms
  ↓
103.198.140.54         ~122–125 ms
  ↓
149.6.154.130          ~120–126 ms
  ↓
162.158.20.53           ~120–140 ms
  ↓
172.67.175.84           no response in traceroute
```

The major divergence is around the Hathway/ISP path: the `104.21` route reaches the subsequent path at roughly 47–50 ms, while the `172.67` route reaches `103.198.140.54` at roughly 123–128 ms. This aligns closely with the forced-IP TCP/TLS/TTFB difference.

### Pathping result — important limitation

`pathping` did **not** reach the Cloudflare destination in this run, so it does **not** provide end-to-end loss statistics.

For `104.21.96.81`, the run stopped after hop 1 during route computation. It showed:

- Local host → router: `0%` loss, ~3 ms.
- Hop 2 did not respond.

For `172.67.175.84`, the run reached hop 4 and then stopped. It showed:

- Local host → router: `0%` loss, ~5 ms.
- `115.98.82.1` reported `100%` ICMP response loss, but downstream hops `202.88.173.105` and `136.232.28.173` showed `0%` loss.

Therefore the `100%` result at `115.98.82.1` is **ICMP response suppression/filtering**, not evidence that the actual traffic path loses 100% of packets there. Likewise, the absence of later pathping results must not be interpreted as end-to-end packet loss.

The earlier direct ping tests remain relevant: `103.198.140.209` had 0% loss but high jitter (47–203 ms), while `103.198.140.170` showed 5% loss and very high jitter (14–374 ms).

## Interpretation

This is strong evidence that the remaining latency is **not an origin/Nginx/cache-generation problem**.

The same hostname and same Cloudflare service show materially different behavior depending on the Cloudflare Anycast destination IP:

`104.21.96.81` → normally ~150–210 ms total

`172.67.175.84` → normally ~370–440 ms total + repeated TCP connection failures

The route evidence shows that this difference begins on the ISP/Anycast path rather than at the origin. The TLS measurements appear to reflect the higher-latency network path rather than proving a Cloudflare TLS configuration defect.

The `/cdn-cgi/trace` output identified the active Cloudflare colo as `SIN` for the normal path. Therefore the current investigation is specifically focused on **ISP → Cloudflare Anycast routing / edge selection / path quality**, not on production cache or origin configuration.

## Important conclusion

Do **not** change:

- Cloudflare Cache Rules
- Cache-Control headers
- Nginx caching configuration
- Next.js caching/prerendering
- origin server configuration
- TLS configuration

until the client-edge path is isolated further.

## Next investigation

1. Treat `pathping` as inconclusive for end-to-end loss because intermediate routers suppress ICMP responses.
2. Compare the same forced-IP measurements from another network/ISP, if available, to distinguish local Hathway routing from Cloudflare-side behavior.
3. If another network reaches both addresses normally, classify the problem as Hathway/ISP-to-Cloudflare routing/peering specific.
4. If multiple independent networks reproduce the `172.67` degradation, investigate whether Cloudflare's anycast route/prefix behavior is involved.
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

Pathping:
- 104.21: stopped before useful downstream statistics; local hop 0% loss.
- 172.67: stopped at hop 4; 115.98.82.1 showed 100% ICMP response loss but downstream responding hops showed 0%, so this is not proof of packet loss.
```
