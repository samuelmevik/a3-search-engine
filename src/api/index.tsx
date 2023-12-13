import { Elysia, t } from "elysia";
import datasetPaths from "../server/reader/dataset-paths";

const api = new Elysia({ prefix: "api" });

api.get('/search', async ({ query }) => {
  const { q, limit } = query;
  console.log({q, limit})
  if (q.length < 3) {
    return (
      <li>Query is too short</li>
    )
  }
  return (
    <li>{query.q}</li>
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
  return { set : datasetPaths}
})

export default api;