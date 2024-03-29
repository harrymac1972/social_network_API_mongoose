
function formatDate(timeStr) {
    const dateOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
    const date = new Date(timeStr);
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    return `${formattedDate} at ${formattedTime}`;
  }
  
  
  module.exports = formatDate;
  