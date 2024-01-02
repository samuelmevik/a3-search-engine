import { Elysia } from "elysia";
import BaseHTML from "../compontents/BaseHTML";
import Box from "../compontents/Box";

const pages = new Elysia();


pages.get('/', async () => {
  return (
    <BaseHTML>
      <body class="max-w-2xl mx-auto px-4 mt-6">
        <Box>
          <form
            hx-get="api/search"
            hx-target="#search-result"
          >
            <input type="search" name="q"
              hx-get="api/search?limit=3"
              hx-trigger="keyup changed delay:500ms"
              hx-target="#search-result"
            />
            <button type="submit">Submit!</button>
          </form>

          <div id="search-result">
            <table>
              <tr>
                <th>Link</th>
                <th>Score</th>
                <th>Content</th>
                <th>Locatation</th>
              </tr>
            </table>

            <table>
              <tr>
                <th>count</th>
                <th>time</th>
              </tr>
            </table>
          </div>


        </Box>
      </body>
    </BaseHTML>
  )
})

export default pages;