import { useField } from 'formik';
import * as React from 'react';

import { AttachmentIcon, Delete } from '@/assets/icons';
import { Button } from '@/components/atoms';
import { getFileExtension } from '@/utils/string';

interface Props {
  name: string;
  onAttachFile: (file?: File) => void;
}
export const InputAttachment = React.memo(({ name, onAttachFile }: Props) => {
  const [{ value }, _helpers] = useField<File>(name);

  const handleChangeFile = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      onAttachFile(e.target.files[0]);
    },
    [onAttachFile],
  );

  const handleRemoveFile = React.useCallback(() => {
    onAttachFile(undefined);
  }, [onAttachFile]);

  return (
    <div className="form-group">
      <input id="upload" type="file" name="image" hidden accept="image/*" onChange={handleChangeFile} />
      <label htmlFor="upload">
        Attachment{' '}
        <span id="file-chosen">
          <AttachmentIcon size="24" />
        </span>
      </label>
      {value && (
        <div className="mt-2 flex items-center justify-between space-x-4">
          <div className="h6 rounded-md bg-blue-200 p-1">{getFileExtension(value.name).toUpperCase()}</div>
          <p className="... truncate">{value.name}</p>
          <Button variant="unstyled" type="button" onClick={handleRemoveFile}>
            <Delete width={24} height={24} />
          </Button>
        </div>
      )}
    </div>
  );
});
