import { HostTrafic, ProtocolTrafic, TraficDataContent } from '../interfaces/traficData';
import { convertBytesToString, parseDownloadValue } from './convertBytes';

let combinedData: TraficDataContent[] = [];
let combinedDataHost: HostTrafic[] = [];
let combinedDataProtocol: ProtocolTrafic[] = [];

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

export function convertHostTrafficData(traffic: HostTrafic, index: number) {

  // Código para unir processos de um mesmo nome em um mesmo objeto
  const existingObject: HostTrafic | undefined = combinedDataHost.find(
    (item) => item.host === traffic.host
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
    combinedDataHost.push({ ...traffic });
  }

  return combinedDataHost;
}

export function convertProtocolTrafficData(traffic: ProtocolTrafic, index: number) {

  // Código para unir processos de um mesmo nome em um mesmo objeto
  const existingObject: ProtocolTrafic | undefined = combinedDataProtocol.find(
    (item) => item.protocol === traffic.protocol
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
    combinedDataProtocol.push({ ...traffic });
  }

  return combinedDataProtocol;
}
