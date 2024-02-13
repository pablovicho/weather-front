// import React from 'react';
import "./App.css";
import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table.tsx";
import IWeather from "./types/weather.tsx";
import { Heart } from "lucide-react";
// import useStore from "./lib/store.ts";

// Fetch API data
const apiResponse = await fetch("http://localhost:8080/api");
const apiData = await apiResponse.json();
//@ts-ignore
async function updateLikes (date) {
  const response = await fetch(`http://localhost:8080/likes?date=${date}`)
  console.log(response.json());
  return response.json()
};

function App() {
  const [clicked, setClicked] = useState<boolean[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  // const addLikes = useStore((state) => state.updateLikes);

  const handleClick = (index: number, date: string) => {
    updateLikes(date);
    setClicked((prev) => {
      const newClicked = [...prev];
      newClicked[index] = !newClicked[index];
      return newClicked;
    });
    setLikes((prev) => {
      const newLikes = [...prev];
      newLikes[index] = prev[index] + 1;
      return newLikes;
    });
  };

  return (
    <div className="App">
      <Table>
        <TableCaption className="w-[300px]">
          Weather in Mexico City
        </TableCaption>

        <TableHead>
          <TableBody>
            {apiData.map((row: IWeather, index: number) => (
              <>
              <TableRow>
              <TableCell>Likes</TableCell>
              <TableCell></TableCell>
            <TableCell>Day</TableCell>
            <TableCell>Description</TableCell>
            <TableCell></TableCell>
            <TableCell>Degrees</TableCell>
            <TableCell></TableCell>
              </TableRow>
              <TableRow
                key={row._id}
                className="flex flex-col border-b border-gray-200"
              >
                <TableCell> {row.likes}</TableCell>
                <button
                  onClick={() => handleClick(index, row.date)}
                  style={{
                    backgroundColor: clicked[index] ? "red" : "inherit",
                    backgroundSize: "cover",
                  }}
                >
                  <Heart style={{}} />
                </button>
                <TableCell className="px-6 py-4">{row.date} °C</TableCell>

                <TableCell className="px-6 py-4">
                  {row.weather[0].description}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <img
                    src={`https://openweathermap.org/img/wn/${row.weather[0].icon}@2x.png`}
                  />
                </TableCell>
                <TableCell className="text-right mb-2">
                  {row.main.temp} °C
                </TableCell>
              </TableRow>
              </>
            ))}
          </TableBody>
        </TableHead>
      </Table>
    </div>
  );
}

export default App;
