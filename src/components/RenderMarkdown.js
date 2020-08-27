// @flow
import * as React from "react";
import ReactMarkdown from "react-markdown/with-html";

import Image from "./MarkdownTypes/Image";
import Link from "./MarkdownTypes/Link";
import Blockquote from "./MarkdownTypes/Blockquote";

type Props = {
  text: string,
  ...
};

const RenderMarkdown = ({ text, ...rest }: Props) => (
  <ReactMarkdown
    {...rest}
    source={text}
    unwrapDisallowed={true}
    allowedTypes={[
      "paragraph",
      "image",
      "strong",
      "blockquote",
      "link",
      "emphasis",
      "text",
      "code",
      "heading"
    ]}
    renderers={{
      paragraph: React.Fragment,
      image: props => <Image {...props} />,
      link: props => <Link {...props} />,
      blockquote: props => <Blockquote {...props} />
    }}
  />
);

export default RenderMarkdown;
