
function logError(err) {
    const cyanColor = "\x1b[36m"; // Cyan color
    const redColor = "\x1b[31m"; // Red color
    const resetColor = "\x1b[0m"; // Reset color

    // Print start line in cyan
    console.log(cyanColor + "\n\n=== Error Message Start ===\n" + resetColor);
    // Print error message in red
    console.log(redColor + err.message + resetColor);
    // Print end line in cyan
    console.log(cyanColor + "\n=== Error Message End ===\n\n" + resetColor);
}


module.exports = logError;
