import React, { useCallback, useState } from "react";
import { useFiles } from "../hooks/useFiles";

/**
 * @returns {React.FunctionComponent}
 */
export default function FileUploader() {
  const { files, setFiles } = useFiles();
  const handleFileEvent = useCallback(
    (e) => {
      const filesToUpload = Array.prototype.slice.call(e.target.files);

      setFiles(filesToUpload);
    },
    [files]
  );

  return (
    <>

      <label htmlFor="FileUploaderInput" class="custum-file-upload">
        <div class="icon flex justify-center items-center">
          <img
            className="w-32"
            src="https://cdn-icons-png.freepik.com/512/9737/9737932.png"
          />
        </div>
        <div class="text">
          <p class="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
            Click to upload document
          </p>
        </div>
        <input
          id="FileUploaderInput"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileEvent}
        />
      </label>
      <div className="fileUploader-list" style={{ paddingTop: "1vh" }}>
        {files.map((file, idx) => (
          <div key={idx}>{file.name}</div>
        ))}
      </div>
    </>
  );
}
