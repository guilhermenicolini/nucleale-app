export interface DownloadFile {
  download: (id: string) => Promise<DownloadFile.Model>
}

export namespace DownloadFile {
  export type Model = {
    fileName: string
    mimeType: string
    data: Buffer
  }
}
