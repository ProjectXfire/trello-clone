import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs';
import { ENTITY_TYPE } from '@prisma/client';
import db from '@/shared/lib/db';

interface IParams {
  params: { cardId: string };
}

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { orgId, userId } = auth();
    if (!orgId || !userId) return new NextResponse('Unauthorized', { status: 500 });
    const auditLogs = await db.auditLog.findMany({
      where: { orgId, entityId: params.cardId, entityType: ENTITY_TYPE.CARD },
      orderBy: { createdAt: 'desc' },
      take: 3
    });
    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 });
  }
}
