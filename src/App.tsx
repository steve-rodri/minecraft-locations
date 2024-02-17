import { useEffect, useState } from "react"
import { Container, Text } from "@mantine/core"
import { Map } from "./components/Map"

const App = () => {
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
    <>
      <Text ta="center" size="xl">
        Minecraft Locations
      </Text>
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
        <Map />
      </Container>
    </>
  )
}

export default App
