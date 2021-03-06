// Markdown Parsing
import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";

export default function ( markdown ) {
  return unified()
    .use( parse )
    .use( remark2react )
    .processSync( markdown ).contents;
}
