# Internationalization (i18n) in Next.js with `next-intl`

## What is i18n?

i18n (short for "internationalization" — 18 letters between the "i" and the "n") is the process of
making your app support multiple languages and locales. Instead of hardcoding text like
`"Hello"` in your components, you use translation keys that resolve to different strings
depending on the user's language.

---

## Why `next-intl`?

Next.js doesn't ship a built-in i18n solution for the App Router. `next-intl` is the most
popular community library that fills this gap. It provides:

- Server & client component support
- Type-safe translations
- Locale-based routing (e.g. `/en/about`, `/fa/about`)
- Middleware for automatic locale detection
- ICU message syntax (plurals, dates, numbers, etc.)

**Installed version in this project:** `next-intl@^4.13.2`

---

## The Big Picture — How the Pieces Fit Together

```
                        Request comes in
                              |
                              v
                    ┌─────────────────┐
                    │   middleware.ts  │  Detects locale from URL/cookie/headers,
                    │                 │  redirects if needed (e.g. / → /en)
                    └────────┬────────┘
                             |
                             v
                    ┌─────────────────┐
                    │  next.config.ts  │  The next-intl plugin wraps your Next config
                    │  (with plugin)   │  to enable i18n magic under the hood
                    └────────┬────────┘
                             |
                             v
                    ┌─────────────────┐
                    │  i18n/request.ts │  Called on every request (server-side).
                    │                 │  Loads the right JSON messages file
                    │                 │  based on the current locale.
                    └────────┬────────┘
                             |
                             v
              ┌──────────────┴──────────────┐
              │      app/[locale]/          │  Your entire app lives under
              │        layout.tsx            │  a [locale] dynamic segment.
              │        page.tsx              │  Layout wraps children with
              │        ...                   │  NextIntlClientProvider.
              └──────────────┬──────────────┘
                             |
                             v
                    ┌─────────────────┐
                    │  Your Components │  Use `useTranslations('namespace')`
                    │                 │  to access translated strings.
                    └─────────────────┘
```

---

## Step-by-Step Setup

### Step 1: Install the package

```bash
npm install next-intl
```

> Already done in this project.

---

### Step 2: Create translation files

Create a `messages/` folder at the project root with one JSON file per locale:

**`messages/en.json`**
```json
{
  "HomePage": {
    "title": "Hello World",
    "description": "Welcome to my app"
  }
}
```

**`messages/fa.json`**
```json
{
  "HomePage": {
    "title": "سلام دنیا",
    "description": "به اپلیکیشن من خوش آمدید"
  }
}
```

The top-level keys (like `"HomePage"`) are called **namespaces**. You use them to organize
translations by page or feature.

---

### Step 3: Create the i18n request config

**`src/i18n/request.ts`** (or `i18n/request.ts`)

```ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../../messages/${locale}.json`)).default
}));
```

This function runs on every request. It receives the current `locale` and returns the
matching messages. Think of it as the bridge between "what locale is the user using?"
and "what translations should we load?"

---

### Step 4: Wire up the Next.js plugin

**`next.config.ts`**

```ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* your other config */
};

export default withNextIntl(nextConfig);
```

The plugin tells Next.js where to find your i18n config file (`i18n/request.ts`) and
sets up the necessary webpack/turbopack aliases.

---

### Step 5: Add middleware for locale routing

**`middleware.ts`** (at the project root)

```ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fa'],
  defaultLocale: 'en'
});

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - _next (Next.js internals)
  // - static files (images, fonts, etc.)
  matcher: ['/', '/(fa|en)/:path*']
};
```

**What the middleware does:**
- User visits `/` → redirects to `/en` (the default locale)
- User visits `/fa/about` → sets locale to `fa`, passes request through
- Reads `Accept-Language` header or a cookie to guess the preferred locale
- The `matcher` config tells Next.js which routes this middleware should run on

---

### Step 6: Restructure your app under `[locale]`

Move your pages into a `[locale]` dynamic segment:

```
app/
  [locale]/
    layout.tsx    ← wraps everything with locale provider
    page.tsx      ← your home page
    innerPage/
      page.tsx
```

**`app/[locale]/layout.tsx`**

```tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Why `NextIntlClientProvider`?**
Server Components can access translations directly. But Client Components (`"use client"`)
can't call server-only functions — so the provider passes the loaded messages down via
React context so that client components can use `useTranslations()` too.

---

### Step 7: Use translations in components

**Server Component (no "use client"):**
```tsx
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

**Client Component:**
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function SearchBox() {
  const t = useTranslations('HomePage');
  return <input placeholder={t('searchPlaceholder')} />;
}
```

Both use the same `useTranslations` hook — `next-intl` handles the server/client
difference internally.

---

## Key Concepts Summary

| Concept | File | Purpose |
|---|---|---|
| **Messages** | `messages/en.json` | The actual translated strings |
| **Request config** | `i18n/request.ts` | Loads the right messages per request |
| **Plugin** | `next.config.ts` | Integrates next-intl with Next.js build |
| **Middleware** | `middleware.ts` | Handles locale detection & URL routing |
| **Provider** | `layout.tsx` | Passes messages to client components |
| **Hook** | Components | `useTranslations()` reads the strings |

---

## Useful Extras (for later)

- **Locale switcher:** Use `next-intl`'s `Link` and `useRouter` from `next-intl/navigation` for locale-aware navigation
- **ICU message format:** Supports plurals (`{count, plural, one {# item} other {# items}}`), dates, numbers
- **Type safety:** You can generate types from your JSON files so typos in translation keys cause build errors
- **`defineRouting()`:** Centralize your locale config in one place and reuse it in middleware + navigation

---

## Current Project Status

- [x] `next-intl` package installed
- [ ] Translation files created (`messages/en.json`, `messages/fa.json`)
- [ ] i18n request config (`i18n/request.ts`)
- [ ] Next.js plugin wired up (`next.config.ts`)
- [ ] Middleware added (`middleware.ts`)
- [ ] App restructured under `[locale]`
- [ ] Translations used in components
