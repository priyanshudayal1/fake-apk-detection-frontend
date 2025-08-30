/**
 * Smooth scroll to a section by ID
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} offset - Optional offset from the top (default: 80px for fixed header)
 */
export const scrollToSection = (sectionId, offset = 80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

/**
 * Scroll to top of the page
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
