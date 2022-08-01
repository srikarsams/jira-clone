import { db } from 'prisma/db';

export async function checkIfUserExists(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return { exists: !!user?.email };
}
