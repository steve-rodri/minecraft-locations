import {
  FontSizeTokens,
  Select,
  SelectProps,
  YStack,
  getFontSize,
} from "tamagui";
import { useServerContext } from "~/context/ServerContext";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { LinearGradient } from "tamagui/linear-gradient";
import { useEffect, useMemo } from "react";
import { useGetServers } from "~/data/servers";

export const ServerSelect = (props: SelectProps) => {
  const { selected, setSelected } = useServerContext();
  const { data: servers } = useGetServers();

  useEffect(() => {
    if (servers) setSelected(servers[0]);
  }, [servers]);

  return (
    <Select
      value={selected?.name}
      onValueChange={(value) => {
        const server = servers?.find((s) => s.name === value);
        if (server) setSelected(server);
      }}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger iconAfter={ChevronDown} maxWidth="$20">
        <Select.Value placeholder="Select Server" />
      </Select.Trigger>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["$background", "transparent"]}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport>
          <Select.Group>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                servers?.map((item, i) => {
                  return (
                    <Select.Item index={i} key={item.name} value={item.name}>
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [servers]
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={"$4"}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? "$true")}
              />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["transparent", "$background"]}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
};
