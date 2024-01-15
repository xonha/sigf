export default function Calendar() {
  const googleCalendarUrl = process.env.GOOGLE_CALENDAR_URL || "";

  return (
    <iframe className="flex p-4 flex-grow" src={googleCalendarUrl}></iframe>
  );
}
