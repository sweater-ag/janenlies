/**
 * Avoid orphans in text by:
 * 1. Replacing the last space with a non-breaking space.
 * 2. Connecting the first two words after a period with a non-breaking space.
 * @param {...Node | NodeList} elements - Elements or NodeLists to process.
 */
function avoidOrphans(...elements) {
    elements.flat().forEach(element => {
        // Skip null or undefined elements
        if (!element) return;

        // If it's a NodeList, convert it to an array and process each element
        if (element instanceof NodeList || Array.isArray(element)) {
            element.forEach(el => processText(el));
        } else {
            processText(element);
        }
    });
}

/**
 * Process text for orphan prevention.
 * @param {Element} element - The DOM element to process.
 */
function processText(element) {
    let text = element.innerHTML.trim();

    // Replace the last space with a non-breaking space to avoid orphans.
    text = text.replace(/\s(?=[^\s]*$)/, '&nbsp;');
    
    // Connect the first two words after a period using a non-breaking space.
    text = text.replace(/(\.\s+)(\w+)\s+(\w+)/g, '$1$2&nbsp;$3');
    
    element.innerHTML = text;
}

// Select your elements
const text = document.querySelectorAll('p');

// Usage: Pass the elements directly
avoidOrphans(text);
