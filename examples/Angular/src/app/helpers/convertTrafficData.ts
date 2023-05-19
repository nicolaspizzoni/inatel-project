import { TraficDataContent } from '../interfaces/traficData';
import { convertBytesToString, parseDownloadValue } from './convertBytes';

let combinedData: TraficDataContent[] = [];

export function convertTrafficData(traffic: TraficDataContent, index: number) {

  // Código para unir processos de um mesmo nome em um mesmo objeto
  const existingObject: TraficDataContent | undefined = combinedData.find(
    (item) => item.name === traffic.name
  );

  if (existingObject) {
    // Somando taxas de download
    const existingValueDownload = parseDownloadValue(existingObject.download);
    const currentValueDownload = parseDownloadValue(traffic.download);
    existingObject.download = convertBytesToString(
      existingValueDownload + currentValueDownload
    );

    // Somando taxas de upload
    const existingValueUpload = parseDownloadValue(existingObject.upload);
    const currentValueUpload = parseDownloadValue(traffic.upload);
    existingObject.upload = convertBytesToString(
      existingValueUpload + currentValueUpload
    );
  } else {
    // Caso não houver objeto de nome repetido
    combinedData.push({ ...traffic });
  }

  return combinedData;
}
