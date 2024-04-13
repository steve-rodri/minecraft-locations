import { useEffect, useState } from "react"
import { Center } from "@mantine/core"
import { supabase } from "./utils/supabase"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeMinimal } from "@supabase/auth-ui-shared"
import { Session } from "@supabase/supabase-js"
import Home from "./Home"

const App = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <Center h="100vh">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeMinimal }}
          providers={[]}
          showLinks={false}
        />
      </Center>
    )
  }

  return <Home />
}

export default App
