import { EmailOtpType, Session } from "@supabase/supabase-js";
import { useGlobalSearchParams } from "expo-router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "~/lib/supabase";

interface AuthContext {
  loading: boolean;
  session: Session | null;
  type?: EmailOtpType;
}

const AuthContext = createContext<AuthContext>({
  loading: true,
  session: null,
  type: "magiclink",
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { token, type } = useGlobalSearchParams<{
    email?: string;
    token?: string;
    type?: EmailOtpType;
  }>();

  console.log(token);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return subscription.unsubscribe;
  }, []);

  useEffect(() => {
    const login = async (token_hash: string) => {
      const {
        data: { session },
      } = await supabase.auth.verifyOtp({ token_hash, type: "invite" });
      console.log("session", session);
      setSession(session);
    };
    if (token) login(token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        type,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authCtx = useContext(AuthContext);
  if (!authCtx) {
    throw Error("useAuthContext must be used within an AuthProvider");
  }
  return authCtx;
};
