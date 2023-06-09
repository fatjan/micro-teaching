export function formatTimestamp(timestamp) {
    const currentTimestamp = new Date();
    const postTimestamp = new Date(timestamp);
    const timeDifference = currentTimestamp - postTimestamp;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
  
    if (hoursDifference > 0) {
      return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  }
  
  // Example usage
  const timestamp = '2023-06-08T22:59:42.626Z';
  const formattedTimestamp = formatTimestamp(timestamp);
  console.log(formattedTimestamp); // Output: "1 hour ago" (or appropriate time difference)