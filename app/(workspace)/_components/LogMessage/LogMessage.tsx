'use client';

import { useMemo } from 'react';
import NextImage from 'next/image';
import { formattingDate } from '@/shared/helpers';
import { type AuditLog } from '@prisma/client';
import styles from './LogMessage.module.css';

interface Props {
  log: AuditLog;
}

function LogMessage({ log }: Props): JSX.Element {
  const { action, entityTitle, entityType, createdAt } = log;

  const message = useMemo(() => {
    switch (action) {
      case 'CREATE': {
        return `created ${entityType.toLowerCase()} "${entityTitle}"`;
      }
      case 'UPDATE': {
        return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
      }
      case 'DELETE': {
        return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
      }
      default:
        return 'unknown action';
    }
  }, [action, entityTitle, entityType]);

  return (
    <li className={styles.log}>
      <NextImage src={log.userImage ?? ''} width={30} height={30} alt='user' />
      <div>
        <p>
          <span>{log.userName}</span> {message}
        </p>
        <p>{formattingDate(createdAt)}</p>
      </div>
    </li>
  );
}
export default LogMessage;
