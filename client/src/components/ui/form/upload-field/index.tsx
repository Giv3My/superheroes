import React from 'react';
import cn from 'clsx';
import toast from 'react-hot-toast';

import { filesService } from '../../../../common/services/file.service';
import { getFullImageSrc } from '../../../../common/utils';
import type { FieldError } from 'react-hook-form';

import { Icon } from '../../icon';
import styles from './upload-field.module.scss';

interface Props {
  className?: string;
  folder: string;
  label: string;
  value: string[];
  error?: FieldError;
  onChange: (...event: any[]) => void;
}

export const UploadField: React.FC<Props> = ({
  className,
  folder,
  label,
  value,
  error,
  onChange,
}) => {
  const [images, setImages] = React.useState<string[]>(value!);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files) {
      return;
    }

    const files = [...e.target.files];
    const uploadedFiles = await handleUpload(files);

    if (!uploadedFiles) {
      return;
    }

    const imageUrls = uploadedFiles.map((file) => file.url);
    const imageSet = new Set([...images, ...imageUrls]);

    onChange([...imageSet]);
    setImages([...imageSet]);
  };

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const { data: files } = await filesService.upload(formData, folder);

      return files;
    } catch (err) {
      toast.error('When uploading the file, an error occurred');
    }
  };

  const handleDeleteImage = (path: string) => () => {
    const updatedImages = images.filter((img) => img !== path);

    setImages(updatedImages);
    onChange(updatedImages);

    if (!updatedImages.length && inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={cn(styles.upload_field, className)}>
      <div className={styles.upload}>
        <label>
          <span>{label}</span>
          <input ref={inputRef} type="file" onChange={handleFileChange} multiple />
          {error && <div className={styles.error}>{error.message}</div>}
        </label>
        <div className={styles.upload_images}>
          {!!images.length &&
            images.map((img, index) => (
              <div key={img} className={styles.image}>
                <img src={getFullImageSrc(img)} alt={`superhero_img_${index}`} />
                <button
                  type="button"
                  className={styles.delete_button}
                  onClick={handleDeleteImage(img)}
                >
                  <Icon name="LuTrash2" className="w-[20px] h-[20px]" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
