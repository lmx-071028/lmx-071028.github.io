(function () {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canTrail = finePointer && !reduceMotion;
  let lastTrailAt = 0;
  let lastBloomAt = 0;

  function setAuroraFocus(event) {
    document.documentElement.style.setProperty("--aurora-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--aurora-y", `${event.clientY}px`);
  }

  function addTrail(event) {
    if (!canTrail || !document.body) return;

    const now = performance.now();
    if (now - lastTrailAt < 34) return;
    lastTrailAt = now;

    const trail = document.createElement("span");
    trail.className = "aurora-cursor-trail";
    trail.style.left = `${event.clientX}px`;
    trail.style.top = `${event.clientY}px`;
    document.body.appendChild(trail);
    window.setTimeout(() => trail.remove(), 660);
  }

  function addBloom(event) {
    if (!canTrail || !document.body) return;
    if (event.button !== 0) return;

    const now = performance.now();
    if (now - lastBloomAt < 180) return;
    lastBloomAt = now;

    const bloom = document.createElement("span");
    bloom.className = "aurora-cursor-bloom";
    bloom.style.left = `${event.clientX}px`;
    bloom.style.top = `${event.clientY}px`;
    document.body.appendChild(bloom);
    window.setTimeout(() => bloom.remove(), 720);
  }

  window.addEventListener("pointermove", function (event) {
    setAuroraFocus(event);
    addTrail(event);
  }, { passive: true });

  window.addEventListener("pointerdown", addBloom, { passive: true });

  let activeTitle = document.title;
  const awayTitle = "快回来喵 (つд⊂)";

  function rememberTitle() {
    if (!document.hidden) activeTitle = document.title;
  }

  function updateVisibilityTitle() {
    if (document.hidden) {
      activeTitle = document.title;
      document.title = awayTitle;
      return;
    }

    document.title = activeTitle;
  }

  document.addEventListener("visibilitychange", updateVisibilityTitle);
  document.addEventListener("pjax:complete", rememberTitle);
})();
