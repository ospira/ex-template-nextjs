'use client'
// This is a Client Component
// It receives data as props, has access to state and effects, and is
// prerendered on the server during the initial page load.

import { useRef } from "react"
import useExcaliburGame from "@/hooks/useExcaliburGame";


export default function App() {

    const excaliburRef = useRef(null)

    useExcaliburGame(excaliburRef)

    return (
      <main>
      </main>
    )
  }