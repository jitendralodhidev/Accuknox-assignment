// Import react
import React, { useState, useMemo } from 'react';

// Importing antd
import { Row, Col, Button, Input, Typography } from 'antd';

// Importing style
import './index.css';

// Defining constants
const { Text } = Typography;
const sentences = [
  'He is not the sharpest knife in the drawer.',
  'The big building was blazing with lights.',
  'Now you must answer some big questions.',
  'Get your Act Together!.',
];

// creating style for each sentence
const sentenceStyles = sentences.map((i) => ({
  index: i,
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  fontSize: 16,
  color: '#000000',
}));


/**
 * TextEditor component allows users to edit text styles dynamically.
 * @returns {JSX.Element} Rendered TextEditor component.
**/
const TextEditor = () => {
  const [textStyles, setTextStyles] = useState(sentenceStyles);

  // Handle text style changes
  const handleTextChange = (index, style) => {
    setTextStyles((prevStyles) => {
      const updatedStyles = [...prevStyles];
      updatedStyles[index] = { ...updatedStyles[index], ...style };
      return updatedStyles;
    });
  };

  // Handle font size changes
  const handleFontSizeChange = (index, value) => {
    handleTextChange(index, { fontSize: parseInt(value, 10) || 16 });
  };

  // Handle color changes
  const handleColorChange = (index, color) => {
    handleTextChange(index, { color });
  };

  const generateSentence = useMemo(
    () => (index, text) => {
      return (
        <div className="sentence" key={index}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div className="sentence-controls">
                <Button onClick={() => handleTextChange(index, { fontWeight: 'bold' })}>Bold</Button>
                <Button onClick={() => handleTextChange(index, { fontStyle: 'italic' })}>Italic</Button>
                <Button onClick={() => handleTextChange(index, { textDecoration: 'underline' })}>Underline</Button>
                <Input
                  className="small-input"
                  type="number"
                  placeholder="Size"
                  onChange={(e) => handleFontSizeChange(index, e.target.value)}
                  value={textStyles[index].fontSize}
                />
                <Input
                  className="small-input"
                  type="color"
                  placeholder="Color"
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  value={textStyles[index].color}
                />
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="display-text">
                <Text style={textStyles[index]}>
                  {text}
                </Text>
              </div>
            </Col>
          </Row>
        </div>
      );
    },
    [handleTextChange, handleFontSizeChange, handleColorChange, textStyles]
  );

  const sentenceComponents = sentences.map((sentence, index) => generateSentence(index, sentence));

  return (
    <div className="text-editor-container">
      {sentenceComponents}
    </div>
  );
};

export default TextEditor;
