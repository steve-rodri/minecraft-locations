import { Button, Dialog, ListItem, Unspaced } from "tamagui"
import { ChevronRight, Key, LogOut, User, X } from "@tamagui/lucide-icons"
import { router } from "expo-router"
import { TouchableOpacity } from "react-native"
import { useAuthContext } from "../context/AuthContext"

export const AccountModal = () => {
  const authCtx = useAuthContext()
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <TouchableOpacity>
          <User />
        </TouchableOpacity>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Account</Dialog.Title>
          <Dialog.Description>Make changes to your account</Dialog.Description>
          <Dialog.Close asChild>
            <ListItem
              minWidth={275}
              icon={Key}
              iconAfter={ChevronRight}
              size="$4"
              title="Change Password"
              hoverTheme
              pressTheme
              radiused
              onPress={() => router.push("/change-password")}
            />
          </Dialog.Close>
          <Dialog.Close asChild>
            <ListItem
              minWidth={275}
              icon={LogOut}
              size="$4"
              title="Sign Out"
              hoverTheme
              pressTheme
              radiused
              onPress={() => {
                authCtx.signOut()
                router.push("/")
              }}
            />
          </Dialog.Close>
          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
