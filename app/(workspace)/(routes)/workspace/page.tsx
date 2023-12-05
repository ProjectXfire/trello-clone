'use client';

import { UserButton } from '@clerk/nextjs';

function WorkspacePage() {
  return (
    <section>
      WorkspacePage <UserButton afterSignOutUrl='/' />
    </section>
  );
}
export default WorkspacePage;
