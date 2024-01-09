import { auth, currentUser } from '@clerk/nextjs';
import { type ACTION, type ENTITY_TYPE } from '@prisma/client';
import db from './db';

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export async function createAuditLog(props: Props) {
  try {
    const { orgId } = auth();
    const user = await currentUser();
    if (!orgId || !user) throw new Error('User not found');
    const { action, entityId, entityTitle, entityType } = props;
    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userName: user?.firstName + ' ' + user?.lastName,
        userImage: user?.imageUrl
      }
    });
  } catch (error) {
    console.error('[AUDIT_LOG_ERROR]', error);
  }
}
