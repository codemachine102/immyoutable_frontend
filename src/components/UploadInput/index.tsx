import React, {
  ChangeEvent,
  FC,
  HTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//assets
import { uploadPlusIcon } from '../../assets/icons';
import { DeleteBucketIcon } from '../iconsComponents';

interface UploadInputProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  files?: File[];
  setFiles: any;
  register?: any;
}

export const UploadInput: FC<UploadInputProps> = ({
  className,
  files,
  setFiles,
  register,
}) => {
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const MAX_LENGTH = 5;

  const { ref, ...fields } = register;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    // console.log(e.target.files);
    if (e.target.files) {
      if (Array.from(e.target.files).length > MAX_LENGTH) {
        e.preventDefault();
        setError(`Cannot upload more than ${MAX_LENGTH} files`);
        return;
      }
      setError('');
      // console.log('setFiles');

      setFiles(Array.from(e.target.files));
    }
  };

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    // console.log('handleUploadClick', files);
    // console.log('handleUploadClick 2', !files?.length);

    if (!files?.length) {
      // console.log('handleUploadClick 3', !files?.length);

      inputRef.current?.click();
    }
  };

  const deleteFile = useCallback(
    (index: number) => {
      if (files !== undefined) {
        // console.log('deleteFile', files);
        const updatedFiles = [...files];
        // const updatedFiles = FileList.apply(files);
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
      }
    },
    [files, setFiles]
  );

  return (
    <>
      <div
        className={cn(
          'uploadInput',
          error && 'uploadInput--error',
          !files?.length && 'uploadInput--pointer',
          className
        )}
        onClick={handleUploadClick}
      >
        {files && files.length ? (
          Array.from(files).map((file, index) => (
            <div
              className='uploadInput__file'
              key={`uploadInput__file-${file?.name}-${index}`}
            >
              <span>{file?.name}</span>
              <DeleteBucketIcon
                className='uploadInput__delete'
                onClick={() => deleteFile(index)}
              />
            </div>
          ))
        ) : (
          <>
            <img src={uploadPlusIcon} alt='Upload Plus' />
            <span>Upload files</span>
          </>
        )}
      </div>
      <input
        type='file'
        // ref={inputRef}
        style={{ display: 'none' }}
        multiple
        // value={''}
        {...fields}
        onChange={handleFileChange}
        ref={(instance) => {
          ref(instance); // RHF wants a reference to this input
          inputRef.current = instance; // We also need it to manipulate the elemnent
        }}
      />
      {error && <p className='uploadInput__error'>{error}</p>}
    </>
  );
};
