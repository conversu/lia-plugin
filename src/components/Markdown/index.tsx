
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import './index.css';


interface Props {
    content?: string | null;
    className?: string;
}

export default function MarkdownRenderer({
    content,
    className = "markdown-content"

}: Props) {


    if (!content || content.length === 0) {
        return null;
    }


    return (
        <div className={className}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                    a: ({ ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                    img: ({ ...props }) => (
                        <img
                            {...props}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                display: 'block',
                                margin: '1rem 0',
                            }}
                            alt={props.alt || ''}
                        />
                    ),
                }}
            >
                {content
                    .split("\n")
                    .map((part) => {
                        if (part.includes("youtube")) {
                            const v = part.trim();
                            let id = null;

                            if (v.includes("?v=")) {
                                id = v.split("?v=")[1];
                            } else {
                                const splitted = v.split("/");
                                id = splitted[splitted.length - 1];
                            }

                            return `[![](https://markdown-videos-api.jorgenkh.no/youtube/${id})](https://youtu.be/${id})`;
                        }

                        if (part.startsWith('https://')) {

                            return `[link](${part})`
                        }

                        if (/^\d+\.\s/.test(part)) {
                            const [index, title] = part.split(". ");
                            return `# **${index}**. ${title}`;
                        }

                        return part;
                    })
                    .join("\n")
                    .replace(/\n/gi, "\n")}
            </ReactMarkdown>
        </div>

    );
}