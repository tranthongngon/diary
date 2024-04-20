import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import quillEmoji from "react-quill-emoji";
Quill.register("modules/imageResize", ImageResize);
Quill.register(
  {
    "formats/emoji": quillEmoji.EmojiBlot,
    "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
    "modules/emoji-textarea": quillEmoji.TextAreaEmoji,
    "modules/emoji-shortname": quillEmoji.ShortNameEmoji,
  },
  true
);

export const module = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["emoji"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  "emoji-toolbar": true,
  "emoji-shortname": true,
};

export const formats = [
  "header",
  "font",
  "bold",
  "italic",
  "align",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "image",
  "color",
  "emoji",
];
