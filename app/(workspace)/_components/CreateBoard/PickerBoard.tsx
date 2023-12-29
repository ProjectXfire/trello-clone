'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { useFormStatus } from 'react-dom';
import { getImages } from '../../_services';
import styles from './CreateBoardPopover.module.css';
import { Loader2, Check } from 'lucide-react';
import { mockImages } from '@/shared/mock/data';
import { InputError } from '@/shared/components';

interface Props {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

function PickerBoard({ id, errors }: Props): JSX.Element {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const onLoadImages = async (): Promise<void> => {
    setIsLoading(true);
    //const { data, error } = await getImages();
    setIsLoading(false);
    if (mockImages) setImages(mockImages);
  };

  useEffect(() => {
    onLoadImages();
  }, []);

  if (isLoading)
    return (
      <div className='p-6 flex items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin' />
      </div>
    );

  return (
    <div>
      <div className={styles.picker}>
        {images.map((img) => (
          <div
            className={styles['picker-item']}
            key={img.id}
            onClick={() => setSelectedImageId(img.id)}
          >
            <input
              readOnly
              className='hidden'
              type='radio'
              id={id}
              name={id}
              checked={selectedImageId === img.id}
              disabled={pending}
              value={`${img.id}|${img.urls.thumb}|${img.urls.full}|${img.links.html}|${img.user.name}`}
            />
            {selectedImageId === img.id && <Check className={styles['picker-item__check']} />}
            <NextImage
              src={img.urls.thumb}
              alt='Unsplash image'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        ))}
      </div>
      <InputError name={id} errors={errors} />
    </div>
  );
}
export default PickerBoard;
