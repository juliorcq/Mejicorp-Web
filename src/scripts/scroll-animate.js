const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.15 }
  );
  
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
  