import { useState } from "react";

import { getConsent, saveConsent } from "../../lib/cookieConsent";

/**
 * Always-available preferences panel for /cookies — Section 5 of that
 * page promises consent can be changed or withdrawn "din setările de
 * cookies disponibile pe site", but until this existed there was no such
 * setting: the banner only ever showed once, on first visit, so a visitor
 * who'd already decided had no way back in short of clearing browser
 * storage by hand. Reads/writes through src/lib/cookieConsent.js, the
 * same module the first-visit banner uses, so a change made here is the
 * same withdrawal a regulator checking GDPR Art. 7(3) would expect: as
 * easy as giving consent in the first place.
 */
function Toggle({ id, checked, disabled, onChange, label, hint }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <label
          htmlFor={id}
          className={`text-sm font-medium text-[color:var(--color-ink)] ${
            disabled ? "opacity-60" : ""
          }`}
        >
          {label}
        </label>
        {hint && (
          <p className="mt-0.5 text-[13px] text-[color:var(--color-copy-muted)]">
            {hint}
          </p>
        )}
      </div>

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-[color:var(--color-ink)]" : "bg-black/15"
        } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function CookiePreferences() {
  const [analytics, setAnalytics] = useState(
    () => Boolean(getConsent()?.analytics),
  );
  const [savedAt, setSavedAt] = useState(null);

  function updateAnalytics(next) {
    setAnalytics(next);
    saveConsent({ analytics: next, marketing: false });
    setSavedAt(Date.now());
  }

  function withdrawAll() {
    updateAnalytics(false);
  }

  return (
    <div className="mt-6 rounded-2xl border border-[color:var(--color-divider)] p-5 sm:p-6">
      <Toggle
        id="cookie-pref-essential"
        checked
        disabled
        onChange={() => {}}
        label="Cookie-uri esențiale"
        hint="Mereu active — necesare pentru funcționarea site-ului."
      />

      <div className="border-t border-[color:var(--color-divider)]" />

      <Toggle
        id="cookie-pref-analytics"
        checked={analytics}
        onChange={updateAnalytics}
        label="Cookie-uri de analiză"
        hint="Pagini vizitate, clickuri, surse UTM — doar cu acordul tău."
      />

      <div className="border-t border-[color:var(--color-divider)]" />

      <Toggle
        id="cookie-pref-marketing"
        checked={false}
        disabled
        onChange={() => {}}
        label="Cookie-uri de marketing"
        hint="Nu sunt folosite momentan pe acest site."
      />

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={withdrawAll}
          className="rounded-full border border-black/[0.14] px-5 py-2.5 text-sm font-medium text-[color:var(--color-ink)] transition-colors duration-200 hover:bg-black/[0.04]"
        >
          Retrage consimțământul
        </button>

        {savedAt && (
          <p
            key={savedAt}
            className="text-sm text-[color:var(--color-copy-muted)]"
          >
            Preferințe salvate.
          </p>
        )}
      </div>
    </div>
  );
}

export default CookiePreferences;
