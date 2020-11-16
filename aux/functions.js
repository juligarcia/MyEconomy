/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
export const colorLuminance = (hex, lum = 0) => {
  let color = String(hex).replace(/[^0-9a-f]/gi, '');

  if (color.length < 6) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }

  let rgb = '#';
  let c;
  let i;
  for (i = 0; i < 3; i++) {
    c = parseInt(color.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += `00${c}`.substr(c.length);
  }

  return rgb;
};

export const lumAmount = (isDark, isDarkMode) => {
  if (isDarkMode) return isDark ? -0.1 : 0.1;
  return isDark ? 0.15 : -0.1;
};

const getRGB = (hex) => {
  const color = parseInt(`0x${hex.slice(1)}`);

  const RR = (color & (0xff << 16)) >> 16;
  const GG = (color & (0xff << 8)) >> 8;
  const BB = color & 0xff;

  return { RR, GG, BB };
};

export const isDark = (hex) => {
  const { RR, GG, BB } = getRGB(hex);
  const average = (RR + GG + BB) / 3;
  return 255 - average > average;
};

export const getLuminance = (color, isDarkMode) =>
  colorLuminance(color, lumAmount(isDark(color), isDarkMode));

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const hex2rgb = (hex) => {
  const { RR, GG, BB } = getRGB(hex);
  return `rgb(${RR},${GG},${BB})`;
};
