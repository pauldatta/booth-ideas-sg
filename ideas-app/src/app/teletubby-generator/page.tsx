"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Teletubby = {
  name: string;
  color: string;
  antennaShape: string;
  bellyScreenPattern: string;
  accessory: string;
};

const colors = ["Red", "Purple", "Yellow", "Green", "Blue", "Orange"];
const antennaShapes = ["Circle", "Triangle", "Square", "Swirl", "Zigzag"];
const bellyScreenPatterns = ["Star", "Flower", "Cloud", "Rainbow", "Sun"];
const accessories = ["Hat", "Scarf", "Bowtie", "Glasses", "Backpack"];
const names = ["Tinky Winky", "Dipsy", "Laa-Laa", "Po", "Noo-Noo"];

const generateTeletubby = (): Teletubby => {
  return {
    name: names[Math.floor(Math.random() * names.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    antennaShape:
      antennaShapes[Math.floor(Math.random() * antennaShapes.length)],
    bellyScreenPattern:
      bellyScreenPatterns[
        Math.floor(Math.random() * bellyScreenPatterns.length)
      ],
    accessory: accessories[Math.floor(Math.random() * accessories.length)],
  };
};

export default function TeletubbyGeneratorPage() {
  const [teletubby, setTeletubby] = useState<Teletubby | null>(null);

  const handleGenerate = () => {
    setTeletubby(generateTeletubby());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Teletubby Character Generator</h1>
      <Button onClick={handleGenerate}>Generate Teletubby</Button>
      {teletubby && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{teletubby.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Color:</strong> {teletubby.color}
            </p>
            <p>
              <strong>Antenna Shape:</strong> {teletubby.antennaShape}
            </p>
            <p>
              <strong>Belly Screen Pattern:</strong>{" "}
              {teletubby.bellyScreenPattern}
            </p>
            <p>
              <strong>Accessory:</strong> {teletubby.accessory}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}