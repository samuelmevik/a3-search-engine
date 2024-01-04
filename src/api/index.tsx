import { Elysia, t } from "elysia";
import { search, test } from "../server/algorithms/search";

const api = new Elysia({ prefix: "api" });


api.get('/search', async ({ query }) => {
  const { q, limit } = query;
  console.log({ q, limit })
  if (q.length < 3) {
    return (
      <p>Query is too short</p>
    )
  }
  const start = Date.now()
  const pages = search(q)
  const result = pages.slice(0, limit || 5)
  const count = pages.reduce((acc) => acc + 1, 0)
  const time = Date.now() - start + 'ms';

  if (pages.length === 0) {
    return (
      <p>No results in {time}</p>
    )
  }

  return (
    <>
      <table>
        <tr>
          <th>Link</th>
          <th>Score</th>
          <th>Content</th>
          <th>Locatation</th>
          <th>PageRank</th>
        </tr>
        {result.map((entry) => <tr>
          <td>{entry.page._name}</td>
          <td>{Math.round((entry.score + Number.EPSILON) * 100) / 100}</td>
          <td>{Math.round((entry.content + Number.EPSILON) * 100) / 100}</td>
          <td>{Math.round((entry.location + Number.EPSILON) * 100) / 100}</td>
          <td>{Math.round((entry.pageRank + Number.EPSILON) * 100) / 100}</td>
        </tr>)}
      </table>
      <table>
        <tr>
          <th>count</th>
          <th>time</th>
        </tr>
        <tr>
          <td>{count}</td>
          <td>{time}</td>
        </tr>
      </table>
    </>
  )
},
  {
    query: t.Object({
      q: t.String(),
      limit: t.Optional(t.Numeric())
    })
  }
)
api.get('/', async () => {
  return { hello: test("super mario") }
})

export default api;
