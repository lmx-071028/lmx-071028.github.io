(function () {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canTrail = finePointer && !reduceMotion;
  let lastTrailAt = 0;

  function setAuroraFocus(event) {
    document.documentElement.style.setProperty("--aurora-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--aurora-y", `${event.clientY}px`);
  }

  function addTrail(event) {
    if (!canTrail || !document.body) return;

    const now = performance.now();
    if (now - lastTrailAt < 26) return;
    lastTrailAt = now;

    const trail = document.createElement("span");
    trail.className = "aurora-cursor-trail";
    trail.style.left = `${event.clientX}px`;
    trail.style.top = `${event.clientY}px`;
    trail.style.setProperty("--trail-hue", String(205 + Math.round((event.clientX / Math.max(window.innerWidth, 1)) * 96)));
    document.body.appendChild(trail);
    window.setTimeout(() => trail.remove(), 760);
  }

  function addBloom(event) {
    if (!canTrail || !document.body) return;

    const bloom = document.createElement("span");
    bloom.className = "aurora-cursor-bloom";
    bloom.style.left = `${event.clientX}px`;
    bloom.style.top = `${event.clientY}px`;
    document.body.appendChild(bloom);
    window.setTimeout(() => bloom.remove(), 820);
  }

  window.addEventListener("pointermove", function (event) {
    setAuroraFocus(event);
    addTrail(event);
  }, { passive: true });

  window.addEventListener("pointerdown", addBloom, { passive: true });
})();
