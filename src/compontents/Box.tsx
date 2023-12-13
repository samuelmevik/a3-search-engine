export default function Box({ children }: { children: JSX.Element[] | JSX.Element }) {
  return (
    <div class="bg-white overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
      <div class="px-4 py-5 sm:p-6">{children}</div>
    </div>
  )
}
