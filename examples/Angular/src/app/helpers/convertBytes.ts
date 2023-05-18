export function getMultiplier(unit: string): number {
  switch (unit) {
    case 'KB':
      return 1e3;
    case 'MB':
      return 1e6;
    case 'GB':
      return 1e9;
    default:
      return 1;
  }
}

export function parseDownloadValue(download: string): number {
  const numericValue = parseFloat(download);
  const unit = download.slice(-2).toUpperCase();
  const multiplier = getMultiplier(unit);
  return numericValue * multiplier;
}

export function convertBytesToString(bytes: number): string {
  if (bytes >= 1e9) {
    return (bytes / 1e9).toFixed(2) + "GB";
  } else if (bytes >= 1e6) {
    return (bytes / 1e6).toFixed(2) + "MB";
  } else if (bytes >= 1e3) {
    return (bytes / 1e3).toFixed(2) + "KB";
  } else {
    return bytes + "B";
  }
}

export function getDownloadNumber(acc: number, item: any) {
  const trafic = item['download'];

  const measureUnits: { [key: string]: number } = {
    KB: 1000,
    MB: 1000000,
    GB: 1000000000,
    B: 1,
  };
  //validação se o trafic.slice retorna uma das chaves do measureUnits
  const multiplier: number =
    measureUnits[trafic.slice(-2)] || measureUnits[trafic.slice(-1)];
  //retornando apenas o que dar match com 0123456789 da variavel trafic
  const number: string = trafic.match(/\d+/)![0];
  acc += parseInt(number) * multiplier;
  return acc;
}

export function getUploadNumber(acc: number, item: any) {
  const trafic = item['upload'];

  const measureUnits: { [key: string]: number } = {
    KB: 1000,
    MB: 1000000,
    GB: 1000000000,
    B: 1,
  };
  //validação se o trafic.slice retorna uma das chaves do measureUnits
  const multiplier: number =
    measureUnits[trafic.slice(-2)] || measureUnits[trafic.slice(-1)];
  //retornando apenas o que dar match com 0123456789 da variavel trafic
  const number: string = trafic.match(/\d+/)![0];
  acc += parseInt(number) * multiplier;
  return acc;
}
