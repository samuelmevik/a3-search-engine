const BaseHTML = ({ children }: JSX.HtmlTag) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <script src="https://unpkg.com/htmx.org@1.9.9" integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX" crossorigin="anonymous"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Document</title>
      </head>
      {children}
    </html>
  );
}
export default BaseHTML;
