/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAvailableAudios, getGuildsByUser, playSound } from "@/services/apiService";

const Home = () => {
  const [guilds, setGuilds] = useState([]);
  const [selectedGuild, setSelectedGuild] = useState("");
  const [channels, setChannels] = useState([]);
  const [audios, setAudios] = useState<string[]>([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const userId = session.user?.image?.split("/")[4];
      getGuildsByUser(userId as any)
        .then(setGuilds)
        .catch(() => {
          toast.error("Failed to load guilds");
        });
    }
  }, [session]);

  useEffect(() => {
    getAvailableAudios()
      .then(setAudios)
      .catch(() => {
        toast.error("Failed to load audios");
      });
  }, []);

  useEffect(()=>{
    setIsButtonDisabled(!selectedChannel || !selectedGuild)
  },[selectedChannel, selectedGuild])

  const handlePlaySound = async (audio: string) => {
    if (isButtonDisabled) return;

    setIsButtonDisabled(true);
    try {
      await playSound(selectedGuild, selectedChannel, audio);
      toast.success("Sound is playing!", { position: "bottom-left" });
    } catch (e) {
      toast.error(`Failed to play sound! ${e}`, { position: "bottom-left" });
    } finally {
      setTimeout(() => setIsButtonDisabled(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-discord-dark text-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        {session ? (
          <Main
            guilds={guilds}
            selectedGuild={selectedGuild}
            setSelectedGuild={setSelectedGuild}
            channels={channels}
            setChannels={setChannels}
            selectedChannel={selectedChannel}
            setSelectedChannel={setSelectedChannel}
            handlePlaySound={handlePlaySound}
            isButtonDisabled={isButtonDisabled}
            audios={audios}
          />
        ) : (
          <p>Please sign in to use this feature.</p>
        )}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Home;
