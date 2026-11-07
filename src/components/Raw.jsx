import { memo } from "react";

/** Elemen dengan isi HTML mentah (markup lama yang belum dijadikan komponen React). Tidak pernah di-render ulang. */
const Raw = memo(function Raw({ as: Tag = "div", html, ...props }) {
  return <Tag {...props} dangerouslySetInnerHTML={{ __html: html }} />;
});
export default Raw;
