import React, { useState, useRef, useEffect } from 'react';
import './terminal.css';


const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);
  const [terminalColor, setTerminalColor] = useState<string>('#ffffff');
  const [typingAnimationVisible, setTypingAnimationVisible] = useState<boolean>(false);
  const terminalRef = useRef<HTMLDivElement>(null);

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

    return brightness > 128 ? '#000000' : '#ffffff';
  };

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
        result = 'Lista de comandos disponíveis: sobrenos, contacto, calendario, materiais, mentoria';
        break;
      case 'sobrenos':
        result = 'Somos o NEI ESTG - IPP, um grupo apaixonado por tecnologia que criou um espaço animado no Discord para estudantes de Informática. É um ponto de encontro para trocar ideias, dicas de programação e relaxar. Junta-te a nós nesta aventura pela Informática na ESTG - IPP! 🚀💻.';
        break;
      case 'calendario':
        result = 'Podes ver eventos adicionados pela comunidade e verificados pelo NEI. Também mostramos feriados, e tu, com a tua sessão iniciada, podes criar eventos. Quando crias um evento, ele fica visível para ti até que atualizes a página.';
        break;
      case 'materiais':
        result = 'Podes ver materiais adicionados pela comunidade e verificados pelo NEI. E tu, com a tua sessão iniciada, podes adicionar também.        ';
        break;
      case 'mentoria':
        result = 'A tua privacidade é uma prioridade. Por isso, não vais saber quem é a outra pessoa até aceitares a mentoria. Depois, terão de combinar como falar, usando Discord, Teams, ou o que preferirem, para realizar a mentoria. É simples e seguro, garantindo que escolhes com quem queres partilhar informações.';
        break;
      case 'contacto':
        result = 'Podes contactar-nos em nei@estg.ipp.pt';
        break;
      default:
        result = `Command not recognized: ${command}`;
    }
    setOutput(prevOutput => [...prevOutput, `$ ${command}`, result]);
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
      <div className="screen" style={{ border: '1px solid #c0c0c0', backgroundColor: '#FFFFFF', color: '#ffffff' }}>
        <div className="terminal" ref={terminalRef}>
          <div style={{ color: '#000000' }}>Bem-vindo ao terminal do NEI!</div>
          <div style={{ color: '#000000' }}>Escreve "help" para veres todos os comandos</div>
          {output.map((line, index) => (
            <div key={index} style={{ color: '#000000' }}>{line}</div>
          ))}
          <div className="terminal-input">
            <span>$</span>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
              style={{color: '#000000'}}
            />
            {typingAnimationVisible && <span className="typing-animation"></span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;