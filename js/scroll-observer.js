//?  import { revealObserver, toggleObserver } from "./scroll-observer.js";

/**
 * RevealObserver — anima elementos al entrar al viewport
 * @param {string|Element|NodeList} target — selector, elemento o lista
 * @param {object} options
 *   className  {string}  clase CSS a agregar          (default: "revealed")
 *   threshold  {number}  0–1, qué porcentaje debe ser visible (default: 0.15)
 *   once       {boolean} desconectar tras primer uso   (default: true)
 *   rootMargin {string}  margen extra del viewport     (default: "0px")
 *   stagger    {number}  ms de delay entre elementos   (default: 0)
 *   maxStagger {number   cap máximo de delay acumulado (default: 600)
 *   onReveal   {fn}      callback(element) al revelar
 *   onHide     {fn}      callback(element) al ocultar (solo si once=false)
 */
export function revealObserver(target, options = {}) {
  const {
    className = "revealed",
    threshold = 0.15,
    once = true,
    rootMargin = "0px",
    stagger = 0,
    maxStagger = 600,
    onReveal = null,
    onHide = null,
  } = options;

  // Normaliza: acepta string, Element, NodeList o Array
  const $elements =
    typeof target === "string" ? [...document.querySelectorAll(target)]
    : target instanceof Element ? [target]
    : [...target];

  if (!$elements.length) return { disconnect: () => {} };

  // Pre-asigna el delay como data attribute para no recalcular en cada entry
  if (stagger > 0) {
    $elements.forEach((el, i) => {
      const delay = Math.min(i * stagger, maxStagger);
      el.style.setProperty("--reveal-delay", `${delay}ms`);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const index = $elements.indexOf(el);

        if (entry.isIntersecting) {
          const delay = stagger > 0 ? Math.min(index * stagger, maxStagger) : 0;

          if (delay > 0) {
            // Guarda el timer para poder cancelarlo si el elemento sale antes
            el._revealTimer = setTimeout(() => {
              el.classList.add(className);
              onReveal?.(el, index);
              if (once) observer.unobserve(el);
            }, delay);
          } else {
            el.classList.add(className);
            onReveal?.(el, index);
            if (once) observer.unobserve(el);
          }
        } else if (!once) {
          // Cancela el timer pendiente si el elemento salió antes de revelarse
          clearTimeout(el._revealTimer);
          el.classList.remove(className);
          onHide?.(el, index);
        }
      });
    },
    { threshold, rootMargin },
  );

  $elements.forEach((el) => observer.observe(el));

  return {
    disconnect: () => {
      // Limpia timers pendientes al desconectar
      $elements.forEach((el) => clearTimeout(el._revealTimer));
      observer.disconnect();
    },
  };
}

/**
 * toggleObserver
 * Observa un elemento "trigger" y agrega/quita una clase
 * en otro elemento "target". Ideal para navs sticky,
 * botones "volver arriba", banners condicionales, etc.
 *
 * @param {string|Element} trigger   elemento observado
 * @param {string|Element} target    elemento que recibe la clase
 * @param {object} options
 *   className    {string}  clase a togglear        (default: "is-scrolled")
 *   activeWhen   {string}  "outside" → activa cuando trigger sale del viewport
 *                          "inside"  → activa cuando trigger está visible
 *                                      (default: "outside")
 *   rootMargin   {string}  margen del viewport     (default: "0px")
 *   onActivate   {fn}      callback(el) al activar
 *   onDeactivate {fn}      callback(el) al desactivar
 */
export function toggleObserver(trigger, target, options = {}) {
  const {
    className = "is-scrolled",
    activeWhen = "outside",
    rootMargin = "0px",
    onActivate = null,
    onDeactivate = null,
  } = options;

  const triggerEl =
    typeof trigger === "string" ? document.querySelector(trigger) : trigger;
  const targetEl =
    typeof target === "string" ? document.querySelector(target) : target;

  if (!triggerEl || !targetEl) {
    console.warn("toggleObserver: trigger o target no encontrado");
    return { disconnect: () => {} };
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      const shouldBeActive =
        activeWhen === "outside" ? !entry.isIntersecting : entry.isIntersecting;

      targetEl.classList.toggle(className, shouldBeActive);
      shouldBeActive ? onActivate?.(targetEl) : onDeactivate?.(targetEl);
    },
    { rootMargin },
  );

  observer.observe(triggerEl);

  return { disconnect: () => observer.disconnect() };
}

/** # Ejemplo de uso
 *
 * ==================================================
 * 🚀 RevealObserver — animaciones al hacer scroll
 * ==================================================
 *
 * Detecta cuándo un elemento entra o sale del viewport
 * y permite:
 * - agregar una clase (CSS)
 * - ejecutar código (JS)
 *
 * --------------------------------------------------
 * 🧩 Uso básico
 * --------------------------------------------------
 * revealObserver(".elemento", {
 *   className: "show-animation",
 *   threshold: 0.2 // 20% visible
 *   rootMargin: "0px 0px -40px 0px" // activa antes
 * });
 *
 * 👉 Cuando el elemento entra en pantalla → agrega "show"
 *
 * --------------------------------------------------
 * 🎯 Control de visibilidad
 * --------------------------------------------------
 * threshold → porcentaje visible (0 a 1)
 * rootMargin → adelanta o retrasa el trigger
 *
 * revealObserver(".elemento", {
 *   threshold: 0.5 // 50% visible
 * });
 *
 * revealObserver(".elemento", {
 *   threshold: 0.1,
 *   rootMargin: "0px 0px -40px 0px" // activa antes
 * });
 *
 * --------------------------------------------------
 * 🔁 Comportamiento (once)
 * --------------------------------------------------
 * true  → se ejecuta una sola vez (default)
 * false → se activa y desactiva al entrar/salir
 *
 * revealObserver(".card", { once: true });   // animación única
 * revealObserver(".barra", { once: false }); // toggle continuo
 *
 * --------------------------------------------------
 * ⚡ Ejecutar código (JS)
 * --------------------------------------------------
 * onReveal → cuando entra en pantalla
 * onHide   → cuando sale (solo si once: false)
 *
 * Ej: contador
 * revealObserver(".counter", {
 *   onReveal: (el) => startCountUp(el),
 * });
 *
 * --------------------------------------------------
 * 🖼 Lazy load de imágenes
 * --------------------------------------------------
 * revealObserver("img[data-src]", {
 *   onReveal: (el) => {
 *     el.src = el.dataset.src;
 *   },
 * });
 *
 * --------------------------------------------------
 * 🎥 Control de video
 * --------------------------------------------------
 * revealObserver(".video", {
 *   once: false,
 *   onReveal: (el) => el.play(),
 *   onHide:   (el) => el.pause(),
 * });
 *
 * --------------------------------------------------
 * 🎥 delay
 * --------------------------------------------------
 * revealObserver(".card", {
 * stagger: 80,     // cada card espera 80ms más que la anterior
 * maxStagger: 400, // en listas de 10+ cards, el delay no supera 400ms
 * threshold: 0.1,
 * });
 *
 * ==================================================
 * 🧭 ToggleObserver — control entre elementos
 * ==================================================
 *
 * Observa un elemento (trigger) y modifica otro (target)
 * Ideal para:
 * - menú sticky
 * - botón "volver arriba"
 * - banners dinámicos
 *
 * --------------------------------------------------
 * 🧩 Uso básico
 * --------------------------------------------------
 * toggleObserver("#trigger", ".menu");
 *
 * 👉 Cuando el trigger sale del viewport → agrega clase al target
 *
 * --------------------------------------------------
 * ⚙️ Opciones
 * --------------------------------------------------
 * className  → clase a agregar (default: "is-scrolled")
 * activeWhen → cuándo activar:
 *   "outside" → cuando el trigger NO es visible (default)
 *   "inside"  → cuando SÍ es visible
 *
 * rootMargin → ajustar punto de activación
 *
 * --------------------------------------------------
 * 🧭 Ejemplo real (menú sticky)
 * --------------------------------------------------
 * toggleObserver("#trigger", ".menu", {
 *   className: "scroll-menu",
 *   rootMargin: "130px 0px 0px 0px"
 * });
 *
 * --------------------------------------------------
 * ⚡ Callbacks
 * --------------------------------------------------
 * toggleObserver("#trigger", ".menu", {
 *   onActivate: (el) => console.log("activo"),
 *   onDeactivate: (el) => console.log("inactivo"),
 * });
 *
 * ==================================================
 * 🧠 Resumen mental
 * ==================================================
 *
 * revealObserver → "cuando este elemento aparece, hago algo"
 *
 * toggleObserver → "cuando ESTE elemento aparece/desaparece,
 *                   modifico OTRO"
 *
 * 👉 Regla clave:
 * "Cuando entra o sale del viewport, reacciono"
 */
