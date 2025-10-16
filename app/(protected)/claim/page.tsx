import { Fragment } from 'react';
import { Container } from '@/components/common/container';
import ClaimPage from './content';

export default function Page() {
  return (
    <Fragment>
      <Container>
        <ClaimPage />
      </Container>
    </Fragment>
  );
}
