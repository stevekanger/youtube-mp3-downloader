"use client";

import Btn from "@/components/ui/Btn";
import Input from "@/components/ui/Input";
import InputErrorMsg from "@/components/ui/InputErrorMsg";
import InputGroup from "@/components/ui/InputGroup";
import InputLabel from "@/components/ui/InputLabel";
import ProcessingText from "@/components/ui/ProcessingText";
import { useApi } from "@/features/api";
import { ApiDataGenrateFileData } from "@/features/api/types";
import useFormMessages from "@/features/forms/hooks/useFormMessages";
import { useSession } from "next-auth/react";
import useProcessingInfo from "../_hooks/useProcessingInfo";
import { AI_VENDOR_GOOGLE } from "@/constants";

export default function ProcessingInfo() {
  const { videoTitle, processingInfo, setProcessingInfo } = useProcessingInfo();
  const { data: session } = useSession();
  const { apiFetch, isPending } = useApi();
  const { formMessages, setFormMessages, clearFormMessages } =
    useFormMessages("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProcessingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div>
      <h3 className="text-2xl mb-4">Processing Info</h3>
      <InputGroup>
        <InputLabel>Filename: </InputLabel>
        <Input
          id="filename"
          name="filename"
          value={processingInfo.filename}
          onChange={handleChange}
        />
      </InputGroup>

      <h3 className="text-xl mt-8 mb-4">Metadata</h3>

      <InputGroup>
        <InputLabel>Title:</InputLabel>
        <Input
          id="title"
          name="title"
          value={processingInfo.title}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <InputLabel>Artist: </InputLabel>
        <Input
          id="artist"
          name="artist"
          value={processingInfo.artist}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <InputLabel>Album:</InputLabel>
        <Input
          id="album"
          name="album"
          value={processingInfo.album}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <InputLabel>Track:</InputLabel>
        <Input
          id="track"
          name="track"
          value={processingInfo.track}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <InputLabel>Date:</InputLabel>
        <Input
          id="date"
          name="date"
          value={processingInfo.date}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <InputLabel>Year:</InputLabel>
        <Input
          id="year"
          name="year"
          value={processingInfo.year}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <InputLabel>Genre:</InputLabel>
        <Input
          id="genre"
          name="genre"
          value={processingInfo.genre}
          onChange={handleChange}
        />
      </InputGroup>

      <div className="my-8">
        <Btn width="full" onClick={handleClick}>
          <ProcessingText isPending={isPending}>
            Fill Info With AI
          </ProcessingText>
        </Btn>

        <InputErrorMsg>{formMessages}</InputErrorMsg>
      </div>
    </div>
  );
}
