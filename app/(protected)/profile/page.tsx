'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { AccountUserProfileContent } from './content';
import { PageNavbar } from '@/app/(protected)/account/page-navbar';

export default function ProfilePage() {
  return (
    <Fragment>
      <PageNavbar />
      <Container>
        <AccountUserProfileContent />
      </Container>
    </Fragment>
  );
}
