import React, { useState, useRef, useEffect } from 'react';
import './terminal.css';

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);
  const [terminalColor, setTerminalColor] = useState<string>('#000');
  const [typingAnimationVisible, setTypingAnimationVisible] = useState<boolean>(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }

    const typingAnimationTimeout = setTimeout(() => {
      setTypingAnimationVisible(true);
    }, 1000);

    return () => clearTimeout(typingAnimationTimeout);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    }
  };

  const executeCommand = (command: string) => {
    let result: string = '';
    switch (command.trim().toLowerCase()) {
      case 'help':
        result = 'List of available commands: help, about, contact, color <hex color>';
        break;
      case 'about':
        result = 'This is a terminal-like interface created with React and TypeScript.';
        break;
      case 'contact':
        result = 'You can contact us at nei@estg.ipp.pt';
        break;
      default:
        if (command.trim().toLowerCase().startsWith('color')) {
          const colorArgs = command.trim().split(' ');
          if (colorArgs.length === 2) {
            const newColor = colorArgs[1];
            if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newColor)) {
              setTerminalColor(newColor);
              return;
            } else {
              result = 'Invalid color format. Please use a valid hexadecimal color code (e.g., #RRGGBB).';
            }
          } else {
            result = 'Invalid color command format. Usage: color <hex color>';
          }
        } else {
          result = `Command not recognized: ${command}`;
        }
    }
    setOutput(prevOutput => [...prevOutput, `$ ${command}`, result]);
  };

  const handleColorChange = (color: string) => {
    setTerminalColor(color);
  };

  const textColor = getTextColor(terminalColor);

  return (
    <div className="laptop-bezel">
      <div className="title-bar">
        <div className="macbook-buttons">
          <span className="macbook-button red"></span>
          <span className="macbook-button yellow"></span>
          <span className="macbook-button green"></span>
        </div>
      </div>
      <div className="screen" style={{ backgroundColor: terminalColor, color: textColor }}>
        <div className="terminal" ref={terminalRef}>
          <div>Welcome to NEI'S Terminal!</div>
          <div>Type "help" to see all commands</div>
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
          <div className="terminal-input">
            <span>$</span>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
            {typingAnimationVisible && <span className="typing-animation">_</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

const getTextColor = (backgroundColor: string): string => {
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const { r, g, b } = hexToRgb(backgroundColor);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? '#000' : '#fff';
};

export default Terminal;