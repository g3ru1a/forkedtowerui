<template>
  <div class="min-h-[60vh] w-full">
    <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <UCard variant="subtle">
        <!-- Header -->
        <div class="flex items-start gap-3">
          <div class="mt-1 flex h-9 w-9 items-center justify-center rounded-lg bg-elevated text-lg">
            <span class="select-none">🍪</span>
          </div>
          <div>
            <h1 class="text-3xl font-semibold tracking-tight">Cookie Policy</h1>
            <p class="mt-1 text-sm opacity-70">
              Effective date:
              <span class="font-medium">August 28, 2025</span>
            </p>
          </div>
        </div>

        <div class="mt-8 grid gap-8">
          <!-- On this page -->
          <section class="rounded-lg border bg-elevated border-none p-4 sm:p-5">
            <h2 class="text-sm font-medium uppercase tracking-wide dark:opacity-70">On this page</h2>
            <nav class="mt-3">
              <ul class="grid gap-2 sm:grid-cols-2">
                <li>
                  <a href="#what-are-cookies" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5">
                    <span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>
                    What Are Cookies?
                  </a>
                </li>
                <li>
                  <a href="#types" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5">
                    <span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>
                    Types of Cookies We Use
                  </a>
                </li>
                <li>
                  <a href="#why" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5">
                    <span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>
                    Why We Use Cookies
                  </a>
                </li>
                <li>
                  <a href="#choices" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5">
                    <span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>
                    Your Choices
                  </a>
                </li>
                <li>
                  <a href="#third-party" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5">
                    <span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>
                    Third-Party Cookies
                  </a>
                </li>
                <li>
                  <a href="#updates" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5">
                    <span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>
                    Updates to This Policy
                  </a>
                </li>
                <li>
                  <a href="#contact" class="group inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5">
                    <span class="h-1.5 w-1.5 rounded-full bg-black dark:bg-white/40"></span>
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </section>

          <!-- Intro -->
          <section class="space-y-3">
            <p>
              This Cookie Policy explains what cookies are, how we use them, and the choices you have regarding them when you use
              <strong>fullparty.gg</strong> (“Service”).
            </p>
          </section>

          <!-- 1 -->
          <section id="what-are-cookies" class="space-y-3">
            <h2 class="text-xl font-semibold">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently,
              improve user experience, and provide usage data to site owners.
            </p>
          </section>

          <!-- 2 -->
          <section id="types" class="space-y-3">
            <h2 class="text-xl font-semibold">2. Types of Cookies We Use</h2>
            <ul class="list-disc space-y-2 pl-5">
              <li><strong>Strictly Necessary Cookies</strong> – required for basic operation of our Service (e.g., authentication, security).</li>
              <li><strong>Preference Cookies</strong> – remember settings like language or region.</li>
              <li><strong>Analytics Cookies</strong> – help us understand how visitors use our Service (e.g., analytics tools).</li>
              <li><strong>Advertising Cookies</strong> – used to deliver relevant ads and measure campaign performance.</li>
              <li><strong>Session Cookies</strong> – temporary cookies deleted when you close your browser.</li>
              <li><strong>Persistent Cookies</strong> – remain on your device for a set period or until deleted.</li>
            </ul>
          </section>

          <!-- 3 -->
          <section id="why" class="space-y-3">
            <h2 class="text-xl font-semibold">3. Why We Use Cookies</h2>
            <ol class="list-decimal space-y-2 pl-5">
              <li>Provide essential website functions.</li>
              <li>Understand how visitors interact with our Service.</li>
              <li>Improve performance and features.</li>
              <li>Deliver tailored content and advertising.</li>
            </ol>
          </section>

          <!-- 4 -->
          <section id="choices" class="space-y-3">
            <h2 class="text-xl font-semibold">4. Your Choices</h2>
            <ul class="list-disc space-y-2 pl-5">
              <li>You can manage cookies via your browser settings (accept, block, or delete cookies).</li>
              <li>You may also opt out of certain third-party advertising cookies using industry tools (e.g., “Your Online Choices”).</li>
              <li>If you disable cookies, some features of our Service may not function properly.</li>
            </ul>
          </section>

          <!-- 5 -->
          <section id="third-party" class="space-y-3">
            <h2 class="text-xl font-semibold">5. Third-Party Cookies</h2>
            <p>
              Some cookies come from trusted third parties (analytics providers, ad networks). These are governed by their respective privacy policies.
            </p>
          </section>

          <!-- 6 -->
          <section id="updates" class="space-y-3">
            <h2 class="text-xl font-semibold">6. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. Updates will be posted here with a revised effective date.
            </p>
          </section>

          <!-- 7 -->
          <section id="contact" class="space-y-3">
            <h2 class="text-xl font-semibold">7. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact:
              <a href="mailto:contact@fullparty.gg" class="underline underline-offset-2 hover:opacity-80">contact@fullparty.gg</a>.
            </p>
          </section>
        </div>
      </UCard>
    </div>
  </div>
</template>