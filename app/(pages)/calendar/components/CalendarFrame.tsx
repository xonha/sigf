export default function CalendarFrame(props: { src: string }) {
  return <iframe className="flex p-4 flex-grow" src={props.src} />;
}
