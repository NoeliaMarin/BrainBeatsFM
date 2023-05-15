"use client";
import React from "react";

const Room = () => {
  interface Room {
    _id: number;
    name: string;
    description: string;
  }
  const [room, setRoom] = React.useState<{
    data: Room | { name: "room" };
    loading: boolean;
  }>({ data: { name: "room" }, loading: true });
  const [tracks, setTracks] = React.useState([]);

  React.useEffect(() => {
    const localRoomName: string = window.localStorage.getItem("roomName")!;

    const fetchRoom = async () => {
      let response = await fetch(`/api/rooms/${localRoomName}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      setRoom({ data: data.room, loading: false });
    };

    const fetchTracks = async () => {
      let response = await fetch(`/api/tracks/${localRoomName}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      let data = await response.json();
      setTracks(data.tracks);
    };

    fetchRoom();
    fetchTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-w-screen min-h-screen p-16">
      <h2>{room.data.name}</h2>
      <h3>{`A room dedicated to AI ${room.data.name} music`}</h3>
      <div className="">
        {tracks.map((t) => (
          <div className="border-2 border-green-600" key={t["_id"]}>
            <h2>{t["title"]}</h2>
            <p>{t["owner"]}</p>
            <p>{t["description"]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
