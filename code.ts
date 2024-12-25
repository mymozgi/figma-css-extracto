// code.ts

export {};  // Add this line at the top
// Rest of your code follows...
figma.showUI(__html__, { width: 450, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-styles') {
    const { colors, typography, spacing } = msg.styles;
    
    // Create color styles
    for (const [name, hex] of Object.entries(colors as { [key: string]: string })) {
      const style = figma.createPaintStyle();
      style.name = name;
      const rgbColor = hexToRgb(hex);
      style.paints = [{
        type: 'SOLID',
        color: rgbColor
      }];
    }
    
    // Create text styles
    for (const style of typography) {
      const textStyle = figma.createTextStyle();
      textStyle.name = style.name;
      textStyle.fontSize = style.fontSize;
      textStyle.lineHeight = style.lineHeight;
      textStyle.letterSpacing = style.letterSpacing;
      textStyle.fontName = { family: style.fontFamily, style: 'Regular' };
    }
    
    figma.notify('Styles created successfully!');
  }
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b };
}