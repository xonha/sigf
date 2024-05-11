export default function Sidebar(props: { children: React.ReactNode }) {
  return (
    <aside className="sticky w-52 xl:block h-[calc(100vh-64px)] border-gray-300 border-l overflow-hidden flex">
      {props.children}
    </aside>
  );
}
