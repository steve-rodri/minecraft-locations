import React, { useEffect, useState } from "react"
import { Button, Container, Text } from "@mantine/core"

const App: React.FC = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Container
      size="xl"
      style={{
        width: windowSize.width,
        height: windowSize.height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text align="center" size="xl">
        Welcome to My Mantine App!
      </Text>
      <Button size="lg" variant="filled">
        Hello Mantine!
      </Button>
    </Container>
  )
}

export default App
