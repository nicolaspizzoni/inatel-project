interface HostTrafic {
  download: string,
  host: string,
  upload: string
}

interface ProtocolTrafic {
  download: string,
  protocol: string,
  upload: string
}

export interface TraficDataContent {
  create_time: string,
  download: string,
  download_speed: string,
  host_traffic: HostTrafic[],
  last_time_update: string,
  name: string,
  pid: string,
  protocol_traffic: ProtocolTrafic[],
  upload:string,
  upload_speed: string
}
