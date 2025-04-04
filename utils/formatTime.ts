export default function formatTime(
  eventStart: Date,
  eventEnd: Date,
  long: boolean,
  includeDate: boolean,
) {
  const formatMinutes = (date: Date) => {
    const minutes = date.getMinutes();
    return minutes === 0
      ? date.toLocaleTimeString([], { hour: 'numeric', hour12: true })
      : date.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
  };

  const startTime = formatMinutes(eventStart);
  const endTime = formatMinutes(eventEnd);

  // Use a plain variable for month names instead of React state
  const monthNames = long
    ? [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
    : [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

  const monthText = monthNames[eventStart.getMonth()];
  const datePrefix = includeDate
    ? `${monthText} ${eventStart.getDate()}, `
    : '';

  return `${datePrefix} ${startTime} - ${endTime}`;
}
