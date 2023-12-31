export const generateRandomMutedColor = () => {
  // Generate random values for the RGB components
  const red = Math.floor(Math.random() * 156) + 100; // 100-255
  const green = Math.floor(Math.random() * 156) + 100; // 100-255
  const blue = Math.floor(Math.random() * 156) + 100; // 100-255

  // Convert the RGB components to a hexadecimal color code
  return `${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
};
