import React, { useState } from "react"
import { isRunningOnClient } from "~/utils/runningOnClient"

type InputSearchVideosProps = {
  initialValue: string
}

export function InputSearchVideos({ initialValue }: InputSearchVideosProps) {
  const runningOnBrowser = isRunningOnClient()

  const [responses, setResponses] = useState({ count: 0, query: [] as string[] })
  const [q, setQuery] = useState(initialValue)

  const search = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    console.log(window.navigator)
    const currentURL = new URL(window.location.href)
    const url = new URL("/counter", currentURL)
    url.searchParams.append("q", q)
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ q }),
      headers
    })

    setResponses(res => ({
      count: res.count + 1,
      query: [...res.query, url.searchParams.get("q") as string]
    }))
  }

  return (
    <div>
      <input onChange={e => setQuery(e.target.value)} value={q} autoFocus type="text" placeholder="Pesquise seu vídeo aqui..." />
      <button disabled={!runningOnBrowser} onClick={search}>Pesquisar</button>
      {/* <button onClick={search}>Pesquisar</button> */}

      <div>
        {responses.query.map((query, i) => (
          <p key={`${query}-${i}`}>{query}</p>
        ))}
      </div>
    </div>
  )
}


