import * as React from "react";
import { cn } from "@/lib/utils";

export interface TerminalCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  code?: string;
  language?: "bash" | "typescript" | "json" | string;
}

export const TerminalCodeBlock = React.forwardRef<HTMLDivElement, TerminalCodeBlockProps>(
  ({ className, title = "Terminal", code, language = "bash", children, ...props }, ref) => {
    
    const highlightBashLine = (line: string, index: number) => {
      // Prompt/Command: $ npx cloudlens scan ...
      if (line.startsWith("$ ")) {
        const cmdPart = "npx cloudlens scan";
        const rest = line.substring(2 + cmdPart.length);
        return (
          <div key={index}>
            <span className="prm text-accent select-none">$</span>{" "}
            <span className="cmd text-text">{cmdPart}</span>
            <span className="str text-[#e9a46e]">{rest}</span>
          </div>
        );
      }
      
      // Divider line
      if (line.startsWith("──")) {
        return (
          <div key={index} className="cmt text-text3">
            {line}
          </div>
        );
      }
      
      // Log line with checkmarks
      if (line.includes("✓")) {
        const checkIdx = line.indexOf("✓");
        const beforeCheck = line.substring(0, checkIdx);
        const afterCheck = line.substring(checkIdx + 1);
        
        if (afterCheck.includes("done")) {
          const doneIdx = afterCheck.indexOf("done");
          const text = afterCheck.substring(0, doneIdx);
          const rest = afterCheck.substring(doneIdx + 4);
          return (
            <div key={index}>
              {beforeCheck}
              <span className="kw text-accent">✓</span>
              {text}
              <span className="val text-blue">done</span>
              <span className="cmt text-text3">{rest}</span>
            </div>
          );
        }
        
        if (afterCheck.includes("files scanned")) {
          const idx = afterCheck.indexOf("247 files scanned");
          if (idx !== -1) {
            return (
              <div key={index}>
                {beforeCheck}
                <span className="kw text-accent">✓</span>
                {afterCheck.substring(0, idx)}
                <span className="val text-blue">247 files scanned</span>
              </div>
            );
          }
        }
        
        if (afterCheck.includes("Scan complete")) {
          return (
            <div key={index}>
              {beforeCheck}
              <span className="kw text-accent">✓</span> Scan complete.{" "}
              <span className="val text-blue">5 services</span> across{" "}
              <span className="val text-blue">2 providers</span>.{" "}
              <span className="cmt text-text3">{afterCheck.substring(afterCheck.indexOf("("))}</span>
            </div>
          );
        }
        
        return (
          <div key={index}>
            {beforeCheck}
            <span className="kw text-accent">✓</span>
            {afterCheck}
          </div>
        );
      }
      
      // Service rows
      if (line.startsWith("  AWS") || line.startsWith("  Stripe")) {
        const isAws = line.includes("AWS");
        const name = isAws ? "AWS" : "Stripe";
        const nameIdx = line.indexOf(name);
        const afterName = line.substring(nameIdx + name.length);
        
        const cmtText = isAws ? "4 services" : "1 service";
        const cmtIdx = afterName.indexOf(cmtText);
        
        if (cmtIdx !== -1) {
          const valText = afterName.substring(0, cmtIdx);
          return (
            <div key={index}>
              {"  "}
              <span className="kw text-accent">{name}</span>
              <span className="val text-blue">{valText}</span>
              <span className="cmt text-text3">{cmtText}</span>
            </div>
          );
        }
      }
      
      return <div key={index}>{line}</div>;
    };

    const highlightTypeScript = (codeText: string) => {
      // Basic regex tokenizer for key-value pairings and strings
      const lines = codeText.split("\n");
      return lines.map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("//") || trimmed.startsWith("/*")) {
          return (
            <div key={i} className="cmt text-text3">
              {line}
            </div>
          );
        }

        // Keywords mapping
        // e.g., "export default", "true", "false"
        let renderedLine = line;
        
        // Find strings in quotes and highlight them
        const stringRegex = /(["'])(.*?)\1/g;
        let match;
        const segments: React.ReactNode[] = [];
        let lastIdx = 0;
        
        // Simple token matching
        // Export default highlight
        if (line.includes("export default")) {
          const idx = line.indexOf("export default");
          segments.push(line.substring(lastIdx, idx));
          segments.push(<span key={`kw-${i}`} className="kw text-accent">export default</span>);
          lastIdx = idx + "export default".length;
        }

        // Highlight true/false
        const restLine = line.substring(lastIdx);
        // Let's replace strings/keys on the remaining line
        // We will do a basic split by keys and values
        // E.g. "  repos: ["anshul280929/payment-gateway-simulator"],"
        // Find keys like repos:, alerts:, etc.
        const keyPattern = /(\b\w+)\s*:/g;
        let keyMatch;
        let tempLine = restLine;
        
        // Render simple highlighted text using direct HTML injection for regex simplicity
        // or a JSX list. Let's do a safe string replacement to HTML.
        // We can format it safely using dangerouslySetInnerHTML or node assembly.
        // Node assembly is safer and cleaner in React.
        
        return (
          <div key={i}>
            {renderTypeScriptLine(line)}
          </div>
        );
      });
    };

    // Safely render TypeScript line with spans
    const renderTypeScriptLine = (line: string) => {
      // Tokenize the line
      // Standard token types: comment, keyword, string, key, value/number, default
      // We can do a sequence of regex replacements and render.
      // Let's convert to HTML safely. We escape HTML first.
      const escaped = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      
      let html = escaped;
      
      // Strings: '...' or "..."
      html = html.replace(/(["'])(.*?)\1/g, '<span class="str text-[#e9a46e]">$1$2$1</span>');
      
      // Keywords: export, default, true, false, const, import, from
      html = html.replace(/\b(export|default|true|false|const|import|from)\b/g, '<span class="kw text-accent">$1</span>');
      
      // Properties/Keys: word followed by colon
      html = html.replace(/\b(\w+)\s*:/g, '<span class="val text-blue">$1</span>:');
      
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    };

    const renderCode = () => {
      if (!code) return children;
      
      if (language === "bash") {
        return code.split("\n").map((line, idx) => highlightBashLine(line, idx));
      }
      
      if (language === "typescript" || language === "javascript") {
        return highlightTypeScript(code);
      }
      
      // Fallback: render raw code lines
      return code.split("\n").map((line, idx) => <div key={idx}>{line}</div>);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "code-block bg-code-bg border border-border rounded-radius overflow-hidden mb-3",
          className
        )}
        {...props}
      >
        <div className="code-hdr flex items-center px-4 py-[9px] border-b border-border gap-1.5">
          <div className="cdot w-2.5 h-2.5 rounded-full bg-[#ff5252]" />
          <div className="cdot w-2.5 h-2.5 rounded-full bg-[#f5b120]" />
          <div className="cdot w-2.5 h-2.5 rounded-full bg-[#2effa0]" />
          {title && (
            <span className="code-title font-mono text-[11px] text-text3 ml-auto select-none">
              {title}
            </span>
          )}
        </div>
        <pre className="code-body p-5 font-mono text-[13px] leading-[1.75] text-text2 overflow-x-auto whitespace-pre">
          <code>{renderCode()}</code>
        </pre>
      </div>
    );
  }
);

TerminalCodeBlock.displayName = "TerminalCodeBlock";
