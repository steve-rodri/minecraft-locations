import { useEffect, useState } from "react"
import { Container, Flex, Group, Select, Stack, Title } from "@mantine/core"
import { Map } from "./components/Map"
import { getPoints, Point } from "./data/getPoints"
import { Server, getServers } from "./data/getServers"
import { AddPointForm } from "./components/AddPointForm"

const Home = () => {
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

  const [points, setPoints] = useState<Point[]>([])
  const [servers, setServers] = useState<Server[]>([])
  const [selectedServer, setSelectedServer] = useState<Server>()

  useEffect(() => {
    const mount = async () => {
      const s = await getServers()
      setServers(s)
      setSelectedServer(s[0])
    }
    mount()
  }, [])

  useEffect(() => {
    const mount = async () => {
      setPoints(await getPoints(selectedServer?.id))
    }
    mount()
  }, [selectedServer])

  return (
    <Stack gap="xl">
      <Title ta="center">Minecraft Locations</Title>
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
        <Map points={points} />
      </Container>

      <Group mx="xl">
        <Select
          w="20vw"
          size="md"
          label="Server"
          placeholder="Select Server"
          value={selectedServer?.name ?? ""}
          onChange={(_value) => {
            const selected = servers.find((s) => s.name === _value)
            if (selected) setSelectedServer(selected)
          }}
          data={servers.map((s) => s.name)}
          nothingFoundMessage="Nothing found..."
        />
      </Group>
      <Flex mx="xl">
        <AddPointForm server={selectedServer} />
      </Flex>
      <Container mx="xl" size="xl">
        {points.map((point, i) => {
          return (
            <Group mt="lg" key={i}>
              <Title style={{ color: "white" }}>{point.label}</Title>
              <Title style={{ color: "white" }}>X: {point.x}</Title>
              <Title style={{ color: "white" }}>Y: {point.y}</Title>
              <Title style={{ color: "white" }}>Z: {point.z}</Title>
            </Group>
          )
        })}
      </Container>
    </Stack>
  )
}

export default Home
