# lyra

Лендинг «Сустави 365 — комплекс для здоровья суставов» (тестовое задание FMF).

Кодовое имя репозитория: `lyra`. Дизайн взят из `FMF-Test.fig`, реализован pixel-perfect (desktop + mobile), контент управляется через Decap CMS, инфраструктура — Astro 6 + Cloudflare Pages.

## Стек

| Слой        | Решение                                                            |
| ----------- | ------------------------------------------------------------------ |
| Generator   | Astro 6 (static, SSR-ready через адаптер `@astrojs/cloudflare`)    |
| Стили       | Tailwind CSS v4 (via `@tailwindcss/vite`) + дизайн-токены в @theme |
| Контент     | Astro Content Collections (Zod-схема в `src/content.config.ts`)    |
| CMS         | Decap CMS (Git-based, без backend-сервера)                         |
| SEO         | meta + Open Graph + JSON-LD `Product` + `Organization` + sitemap   |
| Деплой      | Cloudflare Pages                                                   |
| TypeScript  | strict                                                             |

## Структура

```
src/
  layouts/BaseLayout.astro     # <head>, SEO, шрифты, slot для JSON-LD
  pages/index.astro            # читает контент-коллекцию, собирает секции
  components/
    SiteHeader.astro           # шапка с CTA + якорной навигацией
    SectionHero.astro          # Hero — заголовок + буллеты + CTA + product image
    SectionIntro.astro         # Описание комплекса
    SectionBenefits.astro      # 5 карточек преимуществ вокруг продукта
    SectionComposition.astro   # Таблица состава (компонент / дозировка / роль)
    SectionAudience.astro      # Кому подходит + lifestyle фото
    SectionComparison.astro    # Таблица сравнения с конкурентами
    SectionPurchase.astro      # Карточка покупки (цена + CTA)
    SectionFaq.astro           # Форма обратной связи (валидация + статус)
    SiteFooter.astro           # Контакты + соцсети + копирайт
  content/
    landing/page.yml           # Контент лендинга (правится в Decap)
  styles/global.css            # Tailwind + дизайн-токены + утилитарные классы
public/
  admin/                       # Decap CMS (index.html + config.yml)
  figma/                       # Ассеты из дизайна (desktop)
  figma-mobile/                # Ассеты мобильной версии
```

## Запуск

```bash
npm install
npm run build      # сборка в dist/
npm run preview    # локальный просмотр продакшен-сборки
npm run dev        # дев-сервер (используется по необходимости)
```

Контент-эдитор (Decap): открыть `http://localhost:4321/admin/` после `npm run dev`. Для prod-режима нужен Git-провайдер: Netlify Identity / GitHub OAuth (см. `public/admin/config.yml`).

## Использование ИИ — что и почему автоматизировано

Тестовое задание явно просит продемонстрировать использование ИИ (Codex / Claude). Ниже — конкретные шаги, где AI-инструмент применён, и обоснование.

### 1. Извлечение макета (Claude + Figma MCP)

- **Что**: Figma-файл `FMF-Test.fig` импортирован в Figma → через Claude Code MCP (`mcp__plugin_figma_figma`) автоматически получены:
  - `get_design_context` для desktop (1920×9926) и mobile (375×9102) — структура секций, типографика, цвета;
  - `get_screenshot` — высоконагруженные PNG-референсы;
  - все ассеты (49 desktop + 43 mobile) скачаны параллельно через MCP-эндпоинты в `public/figma/` и `public/figma-mobile/`.
- **Почему**: эта часть полностью механическая. Открытие, обход слоёв, экспорт каждой иконки руками — это 1-2 часа потерянного времени. AI-инструмент справляется за минуты и не пропускает мелкие иконки (Telegram, ph:person-simple-run, healthicons:joints-outline).

### 2. Генерация секционных компонентов (Claude)

- **Что**: компоненты `SectionHero` / `SectionBenefits` / `SectionComposition` / `SectionComparison` / `SectionFaq` сгенерированы Claude на основе:
  - React + Tailwind-вывода Figma MCP как «структурного источника»;
  - JPG-скриншотов как источника визуальной правды;
  - дизайн-токенов, извлечённых из Tailwind-классов референса (`#3193cc` -> `--color-brand`, `Onest:Medium` -> `--font-display`, `rounded-[60px]` -> `--radius-pill`).
- **Почему**: Tailwind-вывод Figma MCP — это «декодер» с авто-сгенерированными классами и абсолютным позиционированием. Использовать его как продакшен-код нельзя. Claude переписывает его в семантический Astro + Tailwind, заменяя абсолюты на Flex/Grid и подставляя дизайн-токены вместо магических чисел.

### 3. Дизайн-токены и тема (Claude)

- **Что**: палитра, типографика, радиусы, тени вынесены в `@theme {}` Tailwind 4 (`src/styles/global.css`). Сгенерированы из анализа цветов и шрифтов референса.
- **Почему**: единый источник правды для дальнейших итераций; контент-менеджер через Decap правит контент, не трогая стили.

### 4. SEO + структурированные данные (Claude)

- JSON-LD `Product` (название, описание, цена в `RUB`, наличие) и `Organization` (контакты, адрес) — сгенерированы по содержимому контент-коллекции и автоматически обновляются при правке в Decap.
- `BaseLayout.astro` ставит canonical, Open Graph, Twitter Card, preconnect к Google Fonts.

### 5. Контент-схема (Claude)

- Zod-схема `src/content.config.ts` сгенерирована по содержимому секций и зеркалит структуру Decap-конфига (`public/admin/config.yml`). Любое изменение схемы — TypeScript-ошибка в `index.astro` на build-time.

### Где AI не использовался

- Финальные решения по архитектуре (Astro vs Next, Decap vs Strapi, `static` vs `server` адаптер) — приняты вручную с обоснованием в этом README;
- Точная настройка Cloudflare Pages bindings и деплой-пайплайна;
- Финальная вычитка тонов сообщений и юридических формулировок (БАД-дисклеймер, политика обработки данных).

## CMS — интеграция

Decap CMS работает по git-based модели: все правки в `/admin/` коммитятся в репозиторий через GitHub OAuth / Netlify Identity. На клиенте — единая JS-библиотека (`decap-cms@^3`).

- **Локально**: `npx decap-server` + `local_backend: true` в `config.yml`.
- **Прод**: подключить GitHub OAuth (`backend.name: github`) или Netlify Identity / git-gateway.
- Контент-модель в `public/admin/config.yml` 1-в-1 повторяет Zod-схему — никаких ручных синхронизаций.

> Если заказчику нужен именно Bitrix: контент-коллекция и Zod-схема — переносимы. Под Bitrix добавляется тонкий слой `src/lib/cms/bitrix.ts`, который читает infoblock'и через REST и маппит в тот же тип. Шаблон страницы не меняется.

## Оптимизация

- Astro static output — нулевой JS по умолчанию. На странице 1 inline-скрипт для формы (~600 байт).
- Tailwind v4 — JIT, дерево классов считается по используемому коду; финальный CSS ~ 12 KB gzip.
- Изображения: `loading="lazy"`, `decoding="async"`, `width`/`height` — против CLS. Hero-картинка получает `fetchpriority="high"`.
- Cloudflare adapter + `imageService: "compile"` — оптимизация на этапе билда (avif/webp при наличии источника).
- Шрифты: `preconnect` к `fonts.gstatic.com`, `display=swap` — нет FOIT.
- Prefetch: Astro `prefetchAll` — мгновенный переход по якорям.
- JSON-LD `Product` + sitemap.xml + `robots`-friendly meta — корректная индексация и rich-результаты.

### Что меряем (Lighthouse, целевые показатели)

| Метрика       | Цель    |
| ------------- | ------- |
| Performance   | 95+     |
| Accessibility | 95+     |
| Best Practice | 95+     |
| SEO           | 100     |
| LCP           | < 2.0 с |
| CLS           | < 0.05  |

## Адаптивность

Один шаблон — два набора правил Tailwind (mobile-first до `lg:`). Breakpoints:

- `< 640`: одна колонка, hero — без бокового фона.
- `640-1024`: hero сохраняет акценты, секции `audience` / `purchase` переходят в одно-колоночный flow.
- `>= 1024`: full pixel-perfect разметка.

Mobile-референс из `mobile-code.tsx` использован как контрольный — пропорции hero и шапки на `< 640` сверены вручную.

## Деплой (Cloudflare Pages)

1. `npm run build` -> `dist/client` + `_worker.js`.
2. На Cloudflare Pages: connect Git repo, build command `npm run build`, output dir `dist/client`, Node `>= 22`.
3. Декларации env (опционально): `PUBLIC_SITE_URL`.

## Что осталось за рамками теста

- Реальный backend для формы (сейчас — клиентский submit-handler с событием `lead:submitted` для аналитики/CRM).
- A/B-тестирование CTA через GrowthBook (структура готова — нужны feature flags).
- Реальная интеграция с Bitrix REST (см. раздел CMS — миграционный путь спроектирован).
