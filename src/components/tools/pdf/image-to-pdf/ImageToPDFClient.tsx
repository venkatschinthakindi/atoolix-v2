"use client";

import { useState } from "react";
import { saveAs } from "file-saver";
import { imagesToPDF, PageSize, Orientation } from "@/utility/imageFileToPdf";
import { DropZone, getAcceptString } from "@/components/ui/dropZone";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Props } from "@/types/props";

export default function ImageToPDFClient({
  config,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [pageSize, setPageSize] = useState<PageSize>("A4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [margin, setMargin] = useState(20);

  const handleFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDownload = async () => {
    if (!files.length) return;

    setLoading(true);

    try {
      const pdfBytes = await imagesToPDF(files, {
        pageSize,
        orientation,
        margin,
      });
      const blob = new Blob([Uint8Array.from(pdfBytes)], {
        type: "application/pdf",
      });
      saveAs(blob, "images2.pdf");

      setProgress(100);

      setTimeout(() => {
        setFile(null);
        setProgress(0);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF");
    }

    setLoading(false);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(files);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setFiles(reordered);
  };
  const validFileTypes = getAcceptString(config.allowedFormats);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-white">
      {/* <ToolTitleDescription title={config.title} description={config.description} /> */}

      <DropZone allowMultiple={true} validFileTypes={validFileTypes} onFiles={handleFiles} />

      {files.length > 0 && (
        <div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="files">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                  {files.map((file, index) => (
                    <Draggable key={file.name + index} draggableId={file.name + index} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-3 rounded-xl border border-white/10 bg-gray-950/40 flex justify-between"
                        >
                          <span>{file.name}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div>
              <label>Page Size</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as PageSize)}
                className="w-full bg-gray-950/40 p-2 rounded-xl border border-white/10"
              >
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
              </select>
            </div>

            <div>
              <label>Orientation</label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as Orientation)}
                className="w-full bg-gray-950/40 p-2 rounded-xl border border-white/10"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div>
              <label>Margin (px)</label>
              <input
                type="number"
                value={margin}
                min={0}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full bg-gray-950/40 p-2 rounded-xl border border-white/10"
              />
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={loading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-500 rounded-xl p-3 disabled:opacity-50"
          >
            {loading ? "Generating PDF..." : "Download PDF"}
          </button>
        </div>
      )}

      {/* SEO Content */}
      <div className="space-y-4 pt-6">
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="text-sm text-gray-300">
          Upload multiple images, reorder them, set page size, orientation, and margins, then download a single PDF.
        </p>

        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="text-sm text-gray-300 list-disc pl-5">
          <li>Supports JPG, PNG, JPEG, WEBP</li>
          <li>Reorder images by drag & drop</li>
          <li>Set page size and margins</li>
          <li>Fully client-side, secure, no uploads</li>
        </ul>

        <h2 className="text-xl font-semibold">FAQ</h2>
        <p className="text-sm text-gray-300">
          All processing happens in your browser. Files are never uploaded.
        </p>
      </div>
    </div>
  );
}