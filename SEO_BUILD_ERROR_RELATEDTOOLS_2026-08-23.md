# RelatedTools Build Error — 2026-08-23

## Reported build error

TypeScript reported:

`Type '{ toolIds: string[]; currentToolId: string; }' is not assignable to type 'IntrinsicAttributes & RelatedToolsProps'. Property 'toolIds' does not exist on type 'IntrinsicAttributes & RelatedToolsProps'. Did you mean 'toolId'?`

Location:

`src/components/tools/dateTime/meeting-time-finder/meetingTimeFinderSeoContent.tsx`

## Root cause

`RelatedToolsProps` defines `toolId` and optional `items`, but it does not define `toolIds` or `currentToolId`.

The affected call used the obsolete API shape:

```tsx
<RelatedTools toolIds={["timezone-converter"]} currentToolId="meeting-time-finder" />
```

The current component API is:

```ts
toolId: string;
items?: RelatedToolItem[];
```

The component also has active-only defaults for registry-driven fallback relationships.

## Fix

The Meeting Time Finder SEO content now uses the current typed API:

```tsx
<RelatedTools
  toolId="meeting-time-finder"
  items={[{ name: "Time Zone Converter", href: "/tools/datetime/timezone-converter" }]}
/>
```

This preserves the intended contextual relationship: Meeting Time Finder → Time Zone Converter.

It also gives the link a descriptive human-readable anchor label and a direct active destination instead of relying on an obsolete prop contract.

## Why this is the SEO-safe fix

This is a source/API compatibility correction, not a keyword or link-volume change. The link remains topically relevant and points directly to the preferred active Time Zone Converter route.

Google's guidance favors crawlable internal links with descriptive, relevant anchor text and recommends direct internal links to preferred destinations after URL changes. This fix satisfies those principles without introducing artificial cross-linking.

## Additional verification

A repository search for `toolIds=` found only the affected Meeting Time Finder SEO content call. No other source occurrence of the obsolete `toolIds` prop was found.

The broader `currentToolId` search still finds unrelated source files because the string is used elsewhere, but the affected Meeting Time Finder call has now been corrected to the current `RelatedToolsProps` API.

## Source commit

`6a6817ecb6a8c3ddd24bd592fba84f2ec4a82a0b` — `fix: align meeting finder related tools props`

## Validation status

- [x] Root cause identified from current `RelatedToolsProps`.
- [x] Obsolete `toolIds` prop removed from Meeting Time Finder.
- [x] Obsolete `currentToolId` prop removed from Meeting Time Finder.
- [x] Current `toolId` prop supplied.
- [x] Current `items` prop supplied with the intended Time Zone Converter relationship.
- [x] Repository search found no remaining `toolIds=` usage.
- [ ] Full production/build/type validation still required where CI/build execution is available.

## SEO rule

Do not work around the TypeScript error by weakening `RelatedToolsProps` with broad optional props or `any`. The typed API should remain the source of truth so incorrect internal-link calls are caught at build time.
