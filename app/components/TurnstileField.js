"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Explicit rendering is reliable on React route transitions. The site key is
// public. The secret is used only by /app/lib/turnstile.js on the server.
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const scriptUrl = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

const TurnstileField = forwardRef(function TurnstileField(
  { action, onTokenChange },
  forwardedRef
) {
  const containerRef = useRef(null);
  const widgetRef = useRef(null);
  const callbackRef = useRef(onTokenChange);
  callbackRef.current = onTokenChange;

  useImperativeHandle(forwardedRef, () => ({
    reset() {
      callbackRef.current?.("");
      if (widgetRef.current !== null && window.turnstile) {
        window.turnstile.reset(widgetRef.current);
      }
    },
  }), []);

  useEffect(() => {
    if (!siteKey) return;

    let disposed = false;
    function render() {
      if (disposed || !containerRef.current || !window.turnstile ||
          widgetRef.current !== null) return;
      widgetRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action,
        theme: "auto",
        size: "flexible",
        callback: (token) => callbackRef.current?.(token),
        "expired-callback": () => callbackRef.current?.(""),
        "error-callback": () => callbackRef.current?.(""),
        "timeout-callback": () => callbackRef.current?.(""),
      });
    }

    if (window.turnstile) {
      render();
    } else {
      let script = document.querySelector('script[data-bhp-turnstile="1"]');
      if (!script) {
        script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        script.dataset.bhpTurnstile = "1";
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
    }

    return () => {
      disposed = true;
      callbackRef.current?.("");
      if (widgetRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetRef.current);
        widgetRef.current = null;
      }
      const script = document.querySelector('script[data-bhp-turnstile="1"]');
      script?.removeEventListener("load", render);
    };
  }, [action]);

  if (!siteKey) return null;

  return (
    <div className="turnstileField">
      <div ref={containerRef} aria-label="Security verification" />
      <small>Security verification is required before submitting.</small>
    </div>
  );
});

export default TurnstileField;
