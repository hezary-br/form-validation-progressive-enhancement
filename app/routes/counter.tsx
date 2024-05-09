import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { InputSearchVideos } from "~/components/InputSearchVideos"
import { isRunningOnClient } from "~/utils/runningOnClient"

let _counter = 0

export async function loader({ }: LoaderFunctionArgs) {
  return { counter: _counter }
}

export async function action({ }: ActionFunctionArgs) {
  _counter++
  return null
}

export default function CounterPage() {
  const { counter } = useLoaderData<typeof loader>()
  const incrementFetcher = useFetcher()
  const incrementSubmitting = incrementFetcher.state !== "idle"
  const counterView = incrementSubmitting ? 1 + counter : counter

  const runningOnBrowser = isRunningOnClient()

  return (
    <>
      <InputSearchVideos key={runningOnBrowser ? 0 : 1} initialValue={runningOnBrowser ? document.querySelector("input")!.value : ""} />
    </>
  )
}