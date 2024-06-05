import { auth } from '@clerk/nextjs';
import db from './db';
import { MAX_FREE_BOARDS } from '../contants';
import { IResponse } from '../interfaces';

export async function incrementAvailableCount(): Promise<IResponse<null>> {
  try {
    const { orgId } = auth();
    if (!orgId) throw new Error('Unauthorized');
    const orgLimit = await db.orgLimit.findUnique({ where: { orgId } });
    if (orgLimit) {
      await db.orgLimit.update({ where: { orgId }, data: { count: orgLimit.count + 1 } });
    } else {
      await db.orgLimit.create({ data: { orgId, count: 1 } });
    }
    return { data: null, error: null, successMessage: 'ok' };
  } catch (error) {
    return { data: null, error: 'Internal error server', successMessage: null };
  }
}

export async function decrementAvailableCount(): Promise<IResponse<null>> {
  try {
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
    return { data: null, error: null, successMessage: 'ok' };
  } catch (error) {
    return { data: null, error: 'Internal error server', successMessage: null };
  }
}

export async function hasAvailableCount(): Promise<IResponse<boolean | null>> {
  try {
    const { orgId } = auth();
    if (!orgId) throw new Error('Unauthorized');
    const orgLimit = await db.orgLimit.findUnique({ where: { orgId } });
    if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS)
      return { data: true, error: null, successMessage: 'ok' };
    return { data: false, error: null, successMessage: 'ok' };
  } catch (error) {
    return { data: null, error: 'Internal error server', successMessage: null };
  }
}

export async function getAvailableCount(): Promise<IResponse<number>> {
  try {
    const { orgId } = auth();
    if (!orgId) throw new Error('Unauthorized');
    const orgLimit = await db.orgLimit.findUnique({ where: { orgId } });
    if (!orgLimit) return { data: MAX_FREE_BOARDS, error: null, successMessage: 'ok' };
    return { data: MAX_FREE_BOARDS - orgLimit.count, error: null, successMessage: 'ok' };
  } catch (error) {
    return { data: 0, error: 'Internal error server', successMessage: null };
  }
}
