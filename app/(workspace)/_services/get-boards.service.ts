import db from '@/shared/lib/db';

export async function getBoards(orgId: string) {
  try {
    const boards = await db.board.findMany({ where: { orgId }, orderBy: { createdAt: 'desc' } });
    return boards;
  } catch (error) {
    return [];
  }
}
