document.addEventListener("DOMContentLoaded", function() {
    const toc = document.querySelector("[vdx-toc-list]");
    const article = document.querySelector("[vdx-toc-article]");
    const headers = article.querySelectorAll("h1, h2, h3, h4, h5, h6");
    
    if (headers.length === 0) return; // No headers, no TOC needed

    // Array of header levels to check
    const headerLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];

    headerLevels.forEach(function(level) {
        // Select the corresponding div within the TOC container
        const tocContainer = toc.querySelector(`[vdx-toc-${level}]`);
        
        if (tocContainer) {
            // Hide the tocContainer by setting display: none;
            tocContainer.style.display = "none";
        }
    });

    headers.forEach(function(header, index) {
        // Determine the header level (h1, h2, etc.)
        const headerLevel = header.tagName.toLowerCase();

        // Select the corresponding div within the TOC container
        const tocContainer = toc.querySelector(`[vdx-toc-${headerLevel}]`);

        // Only proceed if the tocContainer exists
        if (tocContainer) {
            // Create an ID for each header if it doesn't already have one
            if (!header.id) {
                header.id = "header-" + index;
            }

            // Create the TOC entry
            const tocItem = document.createElement("li");

            // Get the class from the tocContainer
            const tocClass = tocContainer.className;

            // Assign the class to the list item if a class was found
            if (tocClass) {
                tocItem.className = tocClass;
            }

            // Create the new link
            const tocLink = document.createElement("a");
            tocLink.href = "#" + header.id;
            tocLink.textContent = header.textContent;

            // Check if the tocContainer has an <a> element and take its class
            const existingLink = tocContainer.querySelector("a");
            if (existingLink && existingLink.className) {
                tocLink.className = existingLink.className;
            }

            // Explicitly set styles to inherit typography from parent
            const computedStyles = window.getComputedStyle(tocItem);
            tocLink.style.fontSize = computedStyles.fontSize;
            tocLink.style.fontWeight = computedStyles.fontWeight;
            tocLink.style.fontFamily = computedStyles.fontFamily;
            tocLink.style.lineHeight = computedStyles.lineHeight;
            tocLink.style.color = computedStyles.color;
            tocLink.style.textDecoration = computedStyles.textDecoration;

            tocItem.appendChild(tocLink);
            toc.appendChild(tocItem);  // Append the list item directly to the existing TOC list
        }
    });
});
