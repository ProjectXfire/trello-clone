'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useOrganizationList } from '@clerk/nextjs';

type TParams = {
  id: string;
};

function OrgControl(): JSX.Element {
  const params = useParams<TParams>();
  const { setActive, isLoaded } = useOrganizationList();

  useEffect(() => {
    if (setActive && params.id) {
      setActive({ organization: params.id });
    }
  }, [setActive, params.id, isLoaded]);

  return <></>;
}
export default OrgControl;
