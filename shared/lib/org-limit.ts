import { auth } from '@clerk/nextjs';
import db from './db';
import { MAX_FREE_BOARDS } from '../contants';

export async function incrementAvailableCount() {
  const { orgId } = auth();
  if (!orgId) throw new Error('Unauthorized');
  const orgLimit = await db.orgLimit.findUnique({ where: { orgId } });
  if (orgLimit) {
    await db.orgLimit.update({ where: { orgId }, data: { count: orgLimit.count + 1 } });
  } else {
    await db.orgLimit.create({ data: { orgId, count: 1 } });
  }
}

export async function decrementAvailableCount() {
  const { orgId } = auth();
  if (!orgId) throw new Error('Unauthorized');
  const orgLimit = await db.orgLimit.findUnique({ where: { orgId } });
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: Math.max(0, orgLimit.count - 1) }
    });
  } else {
    await db.orgLimit.create({ data: { orgId, count: 1 } });
  }
}

export async function hasAvailableCount() {
  const { orgId } = auth();
  if (!orgId) throw new Error('Unauthorized');
  const orgLimit = await db.orgLimit.findUnique({ where: { orgId } });
  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) return true;
  return false;
}

export async function getAvailableCount() {
  const { orgId } = auth();
  if (!orgId) throw new Error('Unauthorized');
  const orgLimit = await db.orgLimit.findUnique({ where: { orgId } });
  if (!orgLimit) return MAX_FREE_BOARDS;
  return MAX_FREE_BOARDS - orgLimit.count;
}
