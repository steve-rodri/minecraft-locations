import { useEffect, useState } from "react"
import { Box, Container, Group, Text, Title } from "@mantine/core"
import { Map } from "./components/Map"
import { points } from "./components/points"

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
    <Box>
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
      <Container
        size="xl"
        style={{
          width: windowSize.width,
          marginTop: 200,
        }}
      >
        {points.map((point) => {
          return (
            <Group mt="lg">
              <Title style={{ color: "white" }}>{point.label}</Title>
              <Title style={{ color: "white" }}>X: {point.x}</Title>
              <Title style={{ color: "white" }}>Y: {point.y}</Title>
              <Title style={{ color: "white" }}>Z: {point.z}</Title>
            </Group>
          )
        })}
      </Container>
    </Box>
  )
}

export default App
