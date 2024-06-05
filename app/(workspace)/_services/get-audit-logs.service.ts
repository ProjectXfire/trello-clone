import db from '@/shared/lib/db';

export async function getAuditLogs(orgId: string) {
  try {
    const auditLogs = await db.auditLog.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' }
    });
    return auditLogs;
  } catch (error) {
    return [];
  }
}
