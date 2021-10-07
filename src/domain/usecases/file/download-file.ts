export interface DownloadFile {
  download: () => Promise<DownloadFile.Model>
}

export namespace DownloadFile {
  export type Model = {
    fileName: string
    mimeType: string
    data: Buffer
  }
}
