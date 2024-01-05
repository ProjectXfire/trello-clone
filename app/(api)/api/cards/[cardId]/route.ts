import db from '@/shared/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse, type NextRequest } from 'next/server';

interface IParams {
  params: { cardId: string };
}

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) return new NextResponse('Unathorized', { status: 401 });
    const card = await db.card.findUnique({
      where: { id: params.cardId, list: { board: { orgId } } },
      include: { list: { select: { title: true } } }
    });
    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse('Internal error server', { status: 500 });
  }
}
