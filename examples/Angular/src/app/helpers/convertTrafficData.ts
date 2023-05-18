import { TraficDataContent } from "../interfaces/traficData";
import { convertBytesToString, parseDownloadValue } from "./convertBytes";

export function convertTrafficData(data: TraficDataContent[]) {
  let combinedData: TraficDataContent[] = [];
  let totalOthersDownload = 0;
  let totalOthersUpload = 0;

  data.forEach((traffic, index) => {
    // Código para unir processos de um mesmo nome em um mesmo objeto
    const existingObject: TraficDataContent | undefined =
      combinedData.find((item) => item.name === traffic.name);

    if (existingObject) {
      // Somando taxas de download
      const existingValueDownload = parseDownloadValue(
        existingObject.download
      );
      const currentValueDownload = parseDownloadValue(traffic.download);
      existingObject.download = convertBytesToString(
        existingValueDownload + currentValueDownload
      );

      // Somando taxas de upload
      const existingValueUpload = parseDownloadValue(
        existingObject.upload
      );
      const currentValueUpload = parseDownloadValue(traffic.upload);
      existingObject.upload = convertBytesToString(
        existingValueUpload + currentValueUpload
      );
    } else {
      // Caso não houver objeto de nome repetido
      combinedData.push({ ...traffic });
    }

    if (index > 4) {
      // Somando download e upload a partir do 5º objeto para mostrar em 'Outros' no gráfico
      let parsedNumberDownload = parseDownloadValue(traffic.download);
      totalOthersDownload += parsedNumberDownload;
      let parsedNumberUpload = parseDownloadValue(traffic.upload);
      totalOthersUpload += parsedNumberUpload;
    }
  });
  let totalDownOthersString = convertBytesToString(
    totalOthersDownload
  );
  let totalUpOthersString = convertBytesToString(
    totalOthersUpload
  );

  let othersDownloadObj = {
    name: 'Outros',
    download: totalDownOthersString,
    upload: totalUpOthersString,
  };

  return {combinedData, othersDownloadObj}
}
