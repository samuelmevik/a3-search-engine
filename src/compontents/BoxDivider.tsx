export default function BoxDivider({ children }: { children: JSX.Element[] }) {
  const [first, ...rest] = children
  return (
    <div class="flex gap-10">
      <div class="flex-1">
        {first}

      </div>
      <div class="flex flex-col gap-3 my-10">
        {rest}
      </div>
    </div>
  );
}
