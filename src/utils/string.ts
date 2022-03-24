export const getFileExtension = (filename: string) => {
  const ext = /\.([^.]+)$/.exec(filename);

  if (ext === null || !ext[1]) {
    return 'file';
  }

  return ext[1];
};
