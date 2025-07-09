const d = document;

export default function scrollSpy() {
  const $sections = d.querySelectorAll("section[data-scroll-spy]");

  const cb = (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const $link = d.querySelector(`a[data-scroll-spy][href="#${id}"]`);

      if (entry.isIntersecting) {
        $link.classList.add("active");
      } else {
        $link.classList.remove("active");
      }
    });
  };

  const observer = new IntersectionObserver(cb, {
    threshold: [0.5, 0.75],
  });

  $sections.forEach((el) => observer.observe(el));
}
